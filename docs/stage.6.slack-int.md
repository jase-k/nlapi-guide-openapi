# [Integrate with Slack!]()

## Steps:

**1. Reset the DB**: We added slackID to the User model so run `npm run seed` to reset the db.

**2. Create Slack App**: 

**3. Distribute Slack App**:
TODO: Finish


## Features Added:

- **Connect Slack Button**: Dashboard page now features user details with a button to connect to slack. 
- **Slack Slash Command**: We made a slash command in our slack application which sends payloads to the /api/oauth/slack/webhook endpoint with user id, command, message. 



## Notes:

- ?slackSuccess param on dashboard determines the message
- Added    app.use(express.urlencoded({ extended: true }));

## Demo

TODO: Add Demo
