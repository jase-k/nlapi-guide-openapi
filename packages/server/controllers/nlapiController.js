const fetch = require('node-fetch'); 

const sendNlapiRequest = async (req, res) => {
  const { userInput, context, threadId } = req.body;
  const authToken = req.headers.authorization.split(' ')[1];

  console.log(userInput, context, threadId);
  try {
    const response = await fetch('https://api.nlapi.io/nlapi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`, // Pass the user's auth token
        'nlapi-key': process.env.NLAPI_API_KEY,
      },
      // NOTE: Transforming the data to snake case for the NLAPI
      body: JSON.stringify({
        user_input: userInput,
        context: context || [], // Optional context
        thread_id: threadId || null, // Optional thread ID
      }),
    });
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error('Error connecting to NLAPI:', error);
    res.status(500).json({ error: 'Failed to connect to NLAPI' });
  }
};

module.exports = {
  sendNlapiRequest,
};
