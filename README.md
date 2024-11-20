# Superhero Complaint Portal Backend

This is the backend for the Superhero Complaint Portal. It is built using Node.js, Express.js, and MongoDB.

## Getting Started

To get started, follow the steps below:

1. Clone the repository

```
git clone https://github.com/sangeethkumarpg/superhero-complaint-portal-be.git
```

2. Install the dependencies

```
npm install
```

3. Start the server

```
npm start
```

4. You can use any rest client and check `http://localhost:5000`.

## Endpoints and request structure

Endpoints

Refer the attached postman collection(api-postman-collection.json in the root directory) for the API endpoints and request structure.

NOTE:
- All endpoints except for `/login` and `/new-complaint` require the user to be authenticated using JWT token.
- The `/login` and `/new-complaint` endpoints do not require the user to be authenticated.
- The API uses JWT for authentication.
- The API uses MongoDB as the database.
- Pass the JWT token in the Authentication header while making requests to the API.
- The application requires a .env file to be present in the root directory with the following variables:

```DATABASE = mongodb url
GOOGLE_APP_PASSWORD = app password for google oauth
GOOGLE_USER_EMAIL = email of the google user
ADMIN_EMAIL = email of the admin user
JWT_SECRET = secret key for JWT
```