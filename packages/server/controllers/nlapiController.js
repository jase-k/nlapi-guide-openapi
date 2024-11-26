const { PassThrough } = require('stream');
const {
  sendNlapiRequest: sendNlapiRequestService,
} = require('../services/nlapiService');

/**
 * Controller to handle NLAPI requests.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const sendNlapiRequest = async (req, res) => {
  const { userInput, context, threadId, options } = req.body;
  const authToken = req.headers.authorization.split(' ')[1];
  console.log(authToken);

  console.log(userInput, context, threadId);
  try {
    const response = await sendNlapiRequestService(
      userInput,
      context,
      threadId,
      options,
      authToken
    );

    if (options?.stream) {
      // Handle streaming response
      const passThrough = new PassThrough();
      response.body.pipe(passThrough);
      passThrough.pipe(res);
    } else {
      const data = await response.json();
      console.log(data);
      res.json(data);
    }
  } catch (error) {
    console.error('Error connecting to NLAPI:', error);
    res.status(500).json({ error: 'Failed to connect to NLAPI' });
  }
};

module.exports = {
  sendNlapiRequest,
};
