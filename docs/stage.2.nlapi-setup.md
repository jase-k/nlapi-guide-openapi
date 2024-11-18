## Overview

In this step we will connect the NLAPI. Since the NLAPI will be making api calls to your server (which is currently only deployed locally) we will need to use a service called nGrok to port traffic from a public web address to a specific port on your machine (5573 unless you changed the port settings in the client package).

We will also need to create an Application in the NLAPI portal (currently the portal is a series of api endpoints, but will have a UI for our portal soon checkout the progress here: [nlapi.io](https://nlapi.io)). Creating an application will give you the ability to create an api key as well.

These steps will require you to save some information to your .env to make the rest of the setup work.

For your convience, I've created a script to easily setup your account in the NLAPI portal.

Once this stage is complete, you should have a simple UI and an API that allows you to ask about users, your profile and families in natural language.

TODO: INSERT Photo of overview of architecture. With ngrok, your computer vs internet, etc.

## Steps:

**1. Setup ngrok**
   I'd recommend getting a permanent url (free) so you do not have to keep adjusting the url that is sent to the NLAPI. If you create a free url, add it to your env file as `NGROK_URL`

**2. Setup NLAPI Account**
   **2.a** Set these env vars: `NLAPI_DEV_USER` && `NLAPI_DEV_PASSWORD` in your .env
   If you do not have an account create one either with the curl command below (replace your username and password) and save your user and password to the .env file with the variables above. Or go to [api.nlapi.io/docs](https://api.nlapi.io/docs#/Portal/signup_user_portal_sessions_signup_post) and use the /portal/sessions/signup swagger ui to create an account.

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

**2.b** Run `setup-nlapi-portal` to create an application and api-key.
*NOTE: If you don't have your NLAPI_SCHEMA_NAME.swagger.json file generated, this script will fail. Run `npm run dev` will automatically create and/or update it.*
You should get an output similar to this:
```bash
Schema uploaded: { message: 'Schema already exists.' }
API Key created: { api_key: 'your-key' }
Save these to your .env file:
        NLAPI_APPLICATION_ID=19
        NLAPI_API_KEY=your-key
```
If you have these environment variables set and run the script again it will skip the application and api key creation and only update the schema. 

*2.c* Make sure to save the `NLAPI_API_KEY` && `NLAPI_APPLICATION_ID` to your .env from step 2.b.

**3. Set Up Github Repository Secrets**
This step is neccessary for deployments.

Save `NLAPI_DEV_USER`, `NLAPI_DEV_PASSWORD`, `NLAPI_SCHEMA_NAME`, `NLAPI_APPLICATION_ID` to your github repository secrets.
This will enable automatically sending your openapi spec to the NLAPI when pushing updates so the NLAPI always has the latest schema of your application. (some extra versioning features are coming soon; But for now, if you upload a schema with the same name as a previously uploaded schema, it will **replace** that schema. If you upload a schema with a different name, it will **add** to the current latest schemas to allow you to upload multiple schemas to one NLAPI application.)

If you are only doing local development you will need to either manually send your openapi schema to the NLAPI each time you make a change to the routes.  

**If you are using this as a template for another repository make note that the `.github/workflows/update-schema.yml` file only runs on specified branches so you will need to adjust to meet your development needs.*


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


## Common Errors:
**ngrok authentication failed**. 
If you get an error like this: 
```
[dev:ngrok ] ERROR:  authentication failed: The authtoken you specified is properly formed, but it is invalid.
[dev:ngrok ] ERROR:  Your authtoken: 2o01B85i3zkRdCSadIHu5ZGoEe_8BaNUmXdoNqhoe3qumii
[dev:ngrok ] ERROR:  This usually happens when:
[dev:ngrok ] ERROR:      - You reset your authtoken
[dev:ngrok ] ERROR:      - Your authtoken was for a team account that you were removed from
[dev:ngrok ] ERROR:      - You are using ngrok link and this credential was explicitly revoked
[dev:ngrok ] ERROR:  Go to your ngrok dashboard and double check that your authtoken is correct:
[dev:ngrok ] ERROR:  https://dashboard.ngrok.com/get-started/your-authtoken
[dev:ngrok ] ERROR:  
[dev:ngrok ] ERROR:  ERR_NGROK_107
[dev:ngrok ] ERROR:  https://ngrok.com/docs/errors/err_ngrok_107
[dev:ngrok ] ERROR:  
```
It's likely you did not set your ngrok authentication token correctly in your ngrok.yml file. 

Once you have ngrok downloaded on your computer you should be able to find the authentication token from any of these files: For the main operating systems we support, their default file locations are:
```
Linux: ~/.config/ngrok/ngrok.yml
MacOS (Darwin): ~/Library/Application Support/ngrok/ngrok.yml
Windows: "%HOMEPATH%\AppData\Local\ngrok\ngrok.yml"
```

**Error reading configuration file 'ngrok.yml': open /home/jase/Apps/nlapi-guide-openapi/ngrok.yml: no such file or directory**
If you are getting this error, it means you have not set your ngrok.yml file (this is gitignored because it contains your auth token) You can copy the ngrok.yml.example file and then set your authentication token properly with the instructions in the above answer.

Another possibility is you named your file .yaml instead of .yml