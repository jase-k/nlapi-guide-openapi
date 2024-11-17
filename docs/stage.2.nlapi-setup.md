## Overview

In this step we will connect the NLAPI. Since the NLAPI will be making api calls to your server (which is currently only deployed locally) we will need to use a service called nGrok to port traffic from a public web address to a specific port on your machine (5573 unless you changed the port settings in the client package).

We will also need to create an Application in the NLAPI portal (currently the portal is a series of api endpoints, but will have a UI for our portal soon checkout the progress here: [nlapi.io](https://nlapi.io)). Creating an application will give you the ability to create an api key as well.

These steps will require you to save some information to your .env to make the rest of the setup work.

For your convience, I've created a script to easily setup your account in the NLAPI portal.

Once this stage is complete, you should have a simple UI and an API that allows you to ask about users, your profile and families in natural language.

TODO: INSERT Photo of overview of architecture. With ngrok, your computer vs internet, etc.

## Steps:

1. Setup ngrok
   I'd recommend getting a permanent url (free) so you do not have to keep adjusting the url that is sent to the NLAPI.
2. Setup NLAPI Account
   2.a Set these env vars: `NLAPI_DEV_USER` && `NLAPI_DEV_PASSWORD` in your .env
   if you do not have an account.
   Create one either with this curl command (replace your username and password) and save your user and password to the .env file with the variable above. Or go to [api.nlapi.io/docs](https://api.nlapi.io/docs#/Portal/signup_user_portal_sessions_signup_post) and use the /portal/sessions/signup swagger ui to create an account.

```bash
curl -X 'POST' \
  'https://api.nlapi.io/portal/sessions/signup' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "string",
  "email": "user@example.com",
  "password": "string"
}'
```

2.b Run `npm setup-nlapi` to create an application and api-key.
\*NOTE: If you don't have your NLAPI_SCHEMA_NAME.swagger.json file generated, this script will fail. Run `npm run dev` will automatically create and/or update it.
You should get an output similar to this:

```
TODO: Make output
```

2.c Save the `NLAPI_API_KEY` && `NLAPI_APPLICATION_ID` to your .env

3. Save 'NLAPI_DEV_USER', 'NLAPI_DEV_PASSWORD', 'NLAPI_SCHEMA_NAME', 'NLAPI_APPLICATION_ID' to your github repository secrets.
   This will enable automatically sending your openapi spec to the NLAPI when pushing updates so the NLAPI always has the latest schema of your application. (some extra versioning features are coming soon; But for now, if you upload a schema with the same name as a previously uploaded schema, it will **replace** that schema. If you upload a schema with a different name, it will **add** to the current latest schemas to allow you to upload multiple schemas to one NLAPI application.)

TODO: finish steps
TODO: Format doc

## Features Added:

- **NLAPI Integration**: Send user input to the nlapi to interact with your application.
- **Github Action to Auto-Update Schema**: Look at .github/actions to see how you can automate the updates of your schema to the NLAPI
- **Stream vs Non-Stream**: Added streaming and non-streaming options to show the difference.
- **Frontend Signup / Login / Dashboard**: Added some UI to the app to see how this would feel in the UI.

## Notes:

- Your .env should have all the keys the .env.example does. Run `npm run check-env` to check.
- You will also need to add these keys to your github secrets to make the github action work properly.
- Schemas are unique by name to allow you to have multiple schemas in an application in case you want to enable micro services. Note that you the authentication system needs to be the same across the multiple schemas. I.e. the same user authorization data you send the NLAPI should work across all schemas. (More features are coming with schema versioning. For the latest checkout our docs at [nlapi.io](nlapi.io) and/or join our [discord community](https://discord.gg/bcjmGnbj8d))
- Note in App.jsx where we hide the chat bubble
- Keep in mind the thread ID is how you keep a conversation going. Up to the developer to save those for now.
- TODO: Add ngrok to the npm run dev command
