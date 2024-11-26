const fetch = require('node-fetch');

/**
 * Sends a request to the NLAPI.
 * @param {string} userInput - The user's input.
 * @param {Array<string>} context - Optional context strings.
 * @param {string|null} threadId - Optional thread ID.
 * @param {Object} options - Additional options.
 * @param {string} authToken - Authorization token.
 * @returns {Promise<Object>} - The response from the NLAPI.
 */
const sendNlapiRequest = async (
  userInput,
  context,
  threadId,
  options,
  authToken
) => {
  const response = await fetch('https://api.nlapi.io/nlapi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`, // Pass the user's auth token
      'nlapi-key': process.env.NLAPI_API_KEY,
    },
    // Transforming the data to snake case for the NLAPI
    body: JSON.stringify({
      user_input: userInput,
      context: context || [], // Optional context
      thread_id: threadId || null, // Optional thread ID
      options: {
        stream: options?.stream || false,
      },
    }),
  });

  return response;
};

module.exports = {
  sendNlapiRequest,
};
