# [Overview](https://drive.google.com/file/d/1jklVbtYduc8neXJLCht-CSeSh-67sz4E/view?usp=drive_link)

In this stage we set up the project and add a simple User Authentication with a jwt token.

## Steps

## Steps

1. Make sure Docker and Node are both installed properly. Node version 20.9 is what I used to create this.
2. Copy .env.example to .env:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies and start development servers:

   ```bash
   npm install && npm run dev
   ```

   This will:

   - Start a docker container called `pg` on port 5444 with postgres and the tgrm extension
   - Use your .env for setup
   - Start the front end and backend servers

   Note: If you change your .env, you'll need to reset the docker container:

   ```bash
   docker stop pg && docker rm pg
   npm run dev
   ```

4. Seed the database:

   ```bash
   npm run seed
   ```

   This will populate the database with sample data for testing in swagger docs.

5. Access the application:
   - Frontend: [http://localhost:5573](http://localhost:5573)
   - API Docs: [http://localhost:5573/api/docs](http://localhost:5573/api/docs)

## Features Added:

- **User Authentication**: JWT-based authentication with hashed passwords (using bcrypt).
- **Database Integration**: PostgreSQL setup with Sequelize ORM, including User and Company models.
- **API Documentation**: Swagger UI integration for auto-generated OpenAPI docs.
- **Proxy Setup**: Create React App proxy for seamless API requests during development.

## Notes:

- Frontend (FE) React app is in `/client` folder
- FE is powered by vite (created by `npm create vite@latest . -- --template react`)
- Access the API documentation and make requests via Swagger UI at [localhost:5573/api/docs](http://localhost:5573/api/docs)
- Using different ports to limit the potential of running into other applications 5573, 3303, 5444
