const { exec } = require('child_process');
require('dotenv').config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT;

if (!dbName || !dbUser || !dbPassword || !dbPort) {
  console.error("DB_NAME, DB_USER, DB_PASSWORD, and DB_PORT must be set in the environment variables.");
  process.exit(1);
}

const dockerRunCommand = `docker run -d --name pg -e POSTGRES_DB=${dbName} -e POSTGRES_USER=${dbUser} -e POSTGRES_PASSWORD=${dbPassword} -p ${dbPort}:5432 postgres:latest -c 'shared_preload_libraries=pg_trgm'`;
const createExtensionCommand = `docker exec pg psql -U ${dbUser} -d ${dbName} -c 'CREATE EXTENSION IF NOT EXISTS pg_trgm;'`;

exec('docker ps -a --filter "name=pg" --format "{{.Names}}"', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error checking docker containers: ${err}`);
    return;
  }
  const containerNames = stdout.trim().split('\n');
  if (containerNames.includes('pg')) {
    exec('docker inspect -f "{{.State.Running}}" pg', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error inspecting docker container: ${err}`);
        return;
      }

      if (stdout.trim() === 'true') {
        console.log("DB already started.");
      } else {
        exec('docker start pg', (err, stdout, stderr) => {
          if (err) {
            console.error(`Error starting docker container: ${err}`);
            return;
          }
          console.log("Docker container started.");
        });
      }
    });
  } else {
    exec(dockerRunCommand, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error running docker: ${err}`);
        return;
      }
      console.log(`Docker started: ${stdout}`);
      setTimeout(() => {
        exec(createExtensionCommand, (err, stdout, stderr) => {
          if (err) {
            console.error(`Error creating extension: ${err}`);
            return;
          }
          console.log(`Extension created: ${stdout}`);
        });
      }, 3000);
    });
  }
});
