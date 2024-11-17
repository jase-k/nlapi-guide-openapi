/**
 * @swagger
 * components:
 *   schemas:
 *     NlapiInput:
 *       type: object
 *       required:
 *         - userInput
 *       properties:
 *         userInput:
 *           type: string
 *           description: The text string of the user's query.
 *         context:
 *           type: array
 *           items:
 *             type: string
 *           description: Any context strings to pass to the NLAPI.
 *           nullable: true
 *         threadId:
 *           type: string
 *           description: The id of the conversation thread you wish to continue.
 *           nullable: true
 *         options:
 *           type: object
 *           description: Additional options to pass to the NLAPI.
 *           nullable: true
 *       example:
 *         userInput: "What are the details of my profile?"
 *         context: ["today is October 29, 2024"]
 *         threadId: "12345"
 *         options: { "stream": "true" }
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NlapiOutput:
 *       type: object
 *       required:
 *         - messages
 *         - thread_id
 *         - token_count
 *         - run_id
 *         - processing_time
 *         - query_time
 *         - total_time
 *         - time_to_first_token
 *         - endpoints_called
 *       properties:
 *         messages:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the message.
 *               speaker:
 *                 type: string
 *                 description: The speaker of the message.
 *               created_at:
 *                 type: integer
 *                 description: The timestamp of the message creation.
 *         thread_id:
 *           type: string
 *           description: The id of the conversation thread.
 *         token_count:
 *           type: integer
 *           description: The number of tokens processed.
 *         run_id:
 *           type: string
 *           description: The id of the run.
 *         processing_time:
 *           type: number
 *           format: float
 *           description: The time taken to process the request.
 *         query_time:
 *           type: number
 *           format: float
 *           description: The time taken to query the data.
 *         total_time:
 *           type: number
 *           format: float
 *           description: The total time taken for the request.
 *         time_to_first_token:
 *           type: number
 *           format: float
 *           description: The time taken to generate the first token.
 *         endpoints_called:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *                 description: The API endpoint path.
 *               method:
 *                 type: string
 *                 description: The HTTP method used.
 *               body:
 *                 type: string
 *                 nullable: true
 *                 description: The request body.
 *               params:
 *                 type: string
 *                 nullable: true
 *                 description: The request parameters.
 *               response:
 *                 type: object
 *                 properties:
 *                   response_status:
 *                     type: integer
 *                     description: The status code of the response.
 *                   response:
 *                     type: string
 *                     description: The response body.
 *               processing_time:
 *                 type: number
 *                 format: float
 *                 description: The time taken to process the endpoint call.
 *       example:
 *         messages:
 *           - content: "Here are some of your customers:\n\n1. **Dwight Schrute**\n   - Email: dwight@schrutefarms.com\n\n2. **Brian Halligan (Sample Contact)**\n   - Email: bh@hubspot.com\n\n3. **Dwight Schrute**\n   - Email: Not Available\n\n4. **Pam Beesely**\n   - Email: pam@dundermifflin.com\n\n5. **Dan Eppinga**\n   - Email: dan@dan.com\n\nIf you need more details or additional customers, feel free to ask!"
 *             speaker: "bot"
 *             created_at: 1731754598
 *           - content: "Who are my customers?"
 *             speaker: "human"
 *             created_at: 1731754593
 *         thread_id: "f5dfc1ee-e13f-4bdb-b0bd-39cca1f0077d"
 *         token_count: 3743
 *         run_id: "05889cc1-8f58-44df-8122-12931a7380dc"
 *         processing_time: 4.6399335861206055
 *         query_time: 0.27483630180358887
 *         total_time: 4.914769887924194
 *         time_to_first_token: 2.9380717277526855
 *         endpoints_called:
 *           - path: "/crm/v3/objects/contacts"
 *             method: "GET"
 *             body: null
 *             params: null
 *             response:
 *               response_status: 200
 *               response: "{\"results\":[{\"id\":\"67309815979\",\"properties\":{\"createdate\":\"2024-10-14T12:53:00.463Z\",\"email\":\"dwight@schrutefarms.com\",\"firstname\":\"Dwight\",\"hs_object_id\":\"67309815979\",\"lastmodifieddate\":\"2024-10-21T13:03:46.965Z\",\"lastname\":\"Schrute\"},\"createdAt\":\"2024-10-14T12:53:00.463Z\",\"updatedAt\":\"2024-10-21T13:03:46.965Z\",\"archived\":false},{\"id\":\"67331997020\",\"properties\":{\"createdate\":\"2024-10-14T12:52:03.512Z\",\"email\":\"bh@hubspot.com\",\"firstname\":\"Brian\",\"hs_object_id\":\"67331997020\",\"lastmodifieddate\":\"2024-10-14T12:52:33.801Z\",\"lastname\":\"Halligan (Sample Contact)\"},\"createdAt\":\"2024-10-14T12:52:03.512Z\",\"updatedAt\":\"2024-10-14T12:52:33.801Z\",\"archived\":false},{\"id\":\"69414294938\",\"properties\":{\"createdate\":\"2024-10-18T18:06:27.085Z\",\"email\":null,\"firstname\":\"Dwight\",\"hs_object_id\":\"69414294938\",\"lastmodifieddate\":\"2024-10-18T18:07:13.899Z\",\"lastname\":\"Schrute\"},\"createdAt\":\"2024-10-18T18:06:27.085Z\",\"updatedAt\":\"2024-10-18T18:07:13.899Z\",\"archived\":false},{\"id\":\"69942830102\",\"properties\":{\"createdate\":\"2024-10-21T00:49:01.097Z\",\"email\":\"pam@dundermifflin.com\",\"firstname\":\"Pam\",\"hs_object_id\":\"69942830102\",\"lastmodifieddate\":\"2024-10-21T01:05:11.712Z\",\"lastname\":\"Beesely\"},\"createdAt\":\"2024-10-21T00:49:01.097Z\",\"updatedAt\":\"2024-10-21T01:05:11.712Z\",\"archived\":false},{\"id\":\"72001711940\",\"properties\":{\"createdate\":\"2024-10-25T20:30:19.656Z\",\"email\":\"dan@dan.com\",\"firstname\":\"Dan\",\"hs_object_id\":\"72001711940\",\"lastmodifieddate\":\"2024-10-26T00:00:04.375Z\",\"lastname\":\"Eppinga\"},\"createdAt\":\"2024-10-25T20:30:19.656Z\",\"updatedAt\":\"2024-10-26T00:00:04.375Z\",\"archived\":false}]}"
 *             processing_time: 0.27483630180358887
 */
