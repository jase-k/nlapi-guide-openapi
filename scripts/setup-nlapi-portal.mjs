// setup-nlapi-portal.js

import fetch from 'node-fetch';
import fs from 'fs';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['NLAPI_DEV_USER', 'NLAPI_DEV_PASSWORD', 'NGROK_URL', 'NLAPI_SCHEMA_NAME'];

const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
  console.error(
    'Missing required environment variables:',
    missingEnvVars.join(', ')
  );
  process.exit(1);
}
async function getAccessToken() {
  const response = await fetch('https://api.nlapi.io/portal/sessions/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: process.env.NLAPI_DEV_USER,
      password: process.env.NLAPI_DEV_PASSWORD,
    }),
  });
  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    developerId: data.developer_id,
  };
}

async function createApplication(accessToken, developerId) {
  const response = await fetch('https://api.nlapi.io/portal/applications', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      name: 'My Next Gen Application',
      api_url: process.env.NGROK_URL, // Use your ngrok URL
      description: 'Implementing the NLAPI via the NLAPI Workshop!',
      api_type: 'openapi',
      developer_id: developerId, // Use your developer ID
    }),
  });

  const data = await response.json();
  console.log('Application created:', data);
  return data.application_id;
}

async function uploadSchema(applicationId, accessToken) {
  const formData = new FormData();
  formData.append(
    'file',
    fs.createReadStream(`./packages/server/${process.env.NLAPI_SCHEMA_NAME}.swagger.json`)
  );
  formData.append('application_id', applicationId);
  formData.append('name', process.env.NLAPI_SCHEMA_NAME);

  const response = await fetch('https://api.nlapi.io/portal/schemas', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...formData.getHeaders(),
    },
    body: formData,
  });

  const data = await response.json();
  console.log('Schema uploaded:', data);
}

async function createApiKey(applicationId, accessToken) {
  const response = await fetch('https://api.nlapi.io/portal/api-keys', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      application_id: applicationId,
    }),
  });

  const data = await response.json();
  console.log('API Key created:', data);
  return data.api_key;
}

(async () => {
  try {
    let applicationId;
    const { accessToken, developerId } = await getAccessToken();
    if (process.env.NLAPI_APPLICATION_ID) {
      console.log('Application already exists, skipping creation');
      applicationId = process.env.NLAPI_APPLICATION_ID;
    } else {
      applicationId = await createApplication(accessToken, developerId);
    }
    await uploadSchema(applicationId, accessToken);
    let apiKey;
    if (process.env.API_KEY) {
      console.log('API Key already exists, skipping creation');
      apiKey = process.env.API_KEY;
    } else {
      apiKey = await createApiKey(applicationId, accessToken);
    }

    console.log(`Save these to your .env file:
        NLAPI_APPLICATION_ID=${applicationId}
        NLAPI_API_KEY=${apiKey}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();