const { sendNlapiRequest } = require('../services/nlapiService');
const fetch = require('node-fetch'); // Ensure you have node-fetch installed
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const handleSlackCallback = async (req, res) => {
  console.log(req.query);
  const { code, state } = req.query;
  console.log(code);
  console.log(state);

  // WARNING! You should validate the state in a more secure way. Currently just checking if valid jwt token.
  // const storedState = req.session.oauthState;
  // if (!storedState || state !== storedState) {
  //     return res.status(400).send("Invalid state parameter");
  // }
  const userId = jwt.verify(state, process.env.JWT_SECRET).id;

  try {
    // Exchange the code for an access token
    console.log('exchanging code for access token');
    console.log(code);
    console.log(process.env.SLACK_REDIRECT_URI);
    const redirectUri = `${process.env.NGROK_URL}${process.env.SLACK_REDIRECT_URI_PATH}`;
    const response = await fetch('https://slack.com/api/oauth.v2.access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (!data.ok) {
      return res.status(400).send(`Error: ${data.error}`);
    }

    // Extract Slack user ID and access token
    const slackId = data.authed_user.id;
    // const accessToken = data.access_token;
    console.log(slackId);
    // console.log(accessToken);

    // Save to database: Associate slackId and accessToken with the logged-in user
    const updateResult = await User.update(
      { slackId: slackId },
      { where: { id: userId } }
    );
    if (updateResult[0] === 0) {
      console.log(
        `Failed to update user with Slack ID: ${slackId}; Zero rows affected`
      );
      return res.redirect(`/dashboard?slackSuccess=false`);
    }

    // Redirect to React app with success
    return res.redirect(`/dashboard?slackSuccess=true`);
  } catch (error) {
    console.error('Error during Slack OAuth:', error);
    return res.status(500).send('Internal Server Error');
  }
};

// Function to handle incoming Slack webhooks
const handleSlackWebhook = async (req, res) => {
  let nlapiResponseData;
  let threadTs;
  let messageToRespondWith;
  const {
    user_id: slackUserId,
    text: slackText,
    response_url,
    team_domain,
    user_name,
    channel_id: channelId,
  } = req.body;
  console.log(req.body);
  console.log(req.headers);
  console.log(`Content Length: ${req.headers['content-length']}`);
  console.log(slackUserId);
  console.log(slackText);
  console.log(response_url);
  console.log(team_domain);
  console.log(user_name);

  res.status(200).json({ response_type: 'in_channel' }); // Acknowledge the Slack event

  try {
    // Find the user based on Slack customer ID
    const user = await User.findOne({ where: { slackId: slackUserId } });
    threadTs = await findThreadTs(channelId, slackText);

    if (!user) {
      console.log('User not found');
      throw new Error('User not found');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Call the NLAPI controller with the user's JWT token and Slack text
    const nlapiResponse = await sendNlapiRequest(
      slackText,
      [],
      null,
      { stream: false },
      token
    );
    nlapiResponseData = await nlapiResponse.json();
    messageToRespondWith = nlapiResponseData.messages[0].content;
    console.log('NLAPI RESPONSE', nlapiResponseData);
  } catch (error) {
    console.error('Error handling Slack webhook:', error);
    messageToRespondWith =
      'Sorry, I had an error processing your request. Please try again later.';
  }

  if (response_url && nlapiResponseData) {
    setTimeout(() => {
      sendResponseToSlack(
        response_url,
        messageToRespondWith,
        channelId,
        threadTs
      )
        .then(() => {
          console.log('Response sent to Slack');
        })
        .catch((error) => {
          console.error('Error sending response to Slack:', error);
        });
    }, 0);
  }
};

const findThreadTs = async (channelId, text) => {
  try {
    const response = await fetch(
      'https://slack.com/api/conversations.history',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
        },
        body: JSON.stringify({
          channel: channelId,
          limit: 10,
        }),
      }
    );

    const responseData = await response.json();
    console.debug('RESPONSE DATA', responseData);

    for (const message of responseData.messages) {
      let messageText = message.text;
      if (messageText.startsWith('/')) {
        messageText = messageText.split(' ').slice(1).join(' ').trim();
      }
      if (messageText === text) {
        return message.ts;
      }
    }
    console.log('Response from Slack conversations.history:', responseData);

    return null;
  } catch (error) {
    console.error('Error fetching Slack conversations history:', error);
    throw error;
  }
};

// Function to send a response back to Slack
const sendResponseToSlack = async (
  responseUrl,
  message,
  channelId,
  threadTs
) => {
  console.log('SENDING RESPONSE TO SLACK', responseUrl, message);
  try {
    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
      body: JSON.stringify({
        text: message, // The message to send back to Slack
        channel: channelId,
        thread_ts: threadTs,
      }),
    });

    const responseData = await response.text();
    console.log('Response from Slack:', responseData);
  } catch (error) {
    console.error('Error sending response to Slack:', error);
  }
};

module.exports = {
  handleSlackWebhook,
  handleSlackCallback,
};
