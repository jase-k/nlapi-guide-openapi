# Overview
In this stage we set up the project and add a simple User Authentication with a jwt token.

## Steps
1. Make sure Docker and Node are both installed properly. Node version 20.9 is what I used to create this. 
2. Copy .env.example to .env
3. `npm install && npm run dev`
This will start a docker container called `pg` on port 5444 with postgres and the extension tgrm installed. That command will use your .env for setup. If you change your .env you will need to run `docker stop pg && docker rm pg` then rerun the `npm run dev` command. After the db is created, this will start the front end and backend servers. 
4. `npm run seed`
This will give you some seed data to play around with in swagger docs (localhost:5573/api/docs)
5. Go to localhost:5573 && localhost:5573/api/docs
You should see the basic vite + react page on the first url and swagger documentation on the second url.


## Features Added: 

- **User Authentication**: JWT-based authentication with hashed passwords (using bcrypt).
- **Database Integration**: PostgreSQL setup with Sequelize ORM, including User and Company models.
- **API Documentation**: Swagger UI integration for auto-generated OpenAPI docs.
- **Proxy Setup**: Create React App proxy for seamless API requests during development.


## Notes: 
- Frontend (FE) React app is in `/client` folder
- FE is powered by vite (created by `npm create vite@latest . -- --template react`)
- localhost:5573/api/docs gets you to swagger docs to use api
- Using different ports to limit the potential of running into other applications 5573, 3303, 5444