# [Integrate with Slack!]()

## Steps:

**1. Reset the DB**: We added slackID to the User model so run `npm run seed` to reset the db. **Warning: this script drops the db so never do this in production**

**2. Create Slack App**: 
1. Go to https://api.slack.com/apps and Create New App from manifest
2. Copy and Paste in the content from slack_manifest.yml
3. Replace the replace-me-with-ngrok-url.com with your env.NGROK_URL value
4. From the Basic Information tab Copy the Client ID, Client Secret to your env file as SLACK_CLIENT_ID && SLACK_CLIENT_SECRET
5. Add SLACK_REDIRECT_URI_PATH to .env from env.example
6. IN `packages/client/.env` add VITE_SLACK_CLIENT_ID && VITE_SLACK_REDIRECT_URI

**3. Test Integration**: 
1. Go to localhost:5573/dashboard (after logging in)
2. Click on Connect to Slack -> You should be redirected to the /dashboard with a success message
3. If successful you should see 'Slack Connected'  in the User Details section.

**4. Distribute Slack App**:
- You can use the slack app console to distribute your app as you see fit. 


## Features Added:

- **Connect Slack Button**: Dashboard page now features user details with a button to connect to slack. 
- **Slack Slash Command**: We made a slash command in our slack application which sends payloads to the /api/oauth/slack/webhook endpoint with user id, command, message. 



## Notes:

- ?slackSuccess param on dashboard determines the message after clicking 'connect'
- Added app.use(express.urlencoded({ extended: true })); for slack callback flow
- Added Slack Bot Token in env.example
- You will need to create a slack app (use the slack_manifest.yml as a template)

## Potential For More

If there is enough interest in expanding on Slack connections, we could add an option to the NLAPI to return with Slack Ui. Slack has the ability to create [interactive messages](https://api.slack.com/messaging/interactivity#components) rather than just plain text. This means that we could make the app integration experience even better. A potential solution would be to add an option in the request to the NLAPI to indicate this is a slack request and we could use a model that is trained in the slack interactive components to create a rich and dynamic response. 

Consider the following scenario: 

The user requests to create a new object in your application that has a long list of required inputs and some are enums. In their first request they do not provide enough context to complete the request, so instead of asking for the required fields (current behavior), your slack bot could create a form right in the slack interface for the user to fill out and submit. 

Or

The user asks for a list of recipes. Rather than sending plain text back the slack interface could look something like this:  
![search results from slack](./assets/slack_search.png)

## Demo Video

TODO: Add Demo
