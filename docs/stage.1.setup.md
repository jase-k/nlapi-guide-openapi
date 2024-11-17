# Overview


# Table of Contents


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