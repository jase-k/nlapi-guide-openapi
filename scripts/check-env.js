const fs = require('fs');
const path = require('path');

// Function to parse .env files into key-value pairs
function parseEnvFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content.split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key) acc[key.trim()] = value ? value.trim() : '';
    return acc;
  }, {});
}

// Paths to your .env and .env.example files
const envPath = path.resolve(__dirname, '../.env');
const envExamplePath = path.resolve(__dirname, '../.env.example');

// Parse the files
const env = parseEnvFile(envPath);
const envExample = parseEnvFile(envExamplePath);

// Find missing keys
const missingKeys = Object.keys(envExample).filter((key) => !(key in env));

if (missingKeys.length > 0) {
  console.log('Missing keys in .env file:', missingKeys.join(', '));
  process.exit(1);
} else {
  console.log('All keys from .env.example are present in .env.');
  process.exit(0);
}
