# Fraud Busters

## Description

The project is a backend system developed using Express.js, TypeScript, Prisma, PostgreSQL, MongoDB, and cloud storage. It allows users to store user data in PostgreSQL, store prediction results in MongoDB, and store CSV files in cloud storage for analysis. The application runs on Node.js with a minimum version of 18, and it requires PostgreSQL version 15. Users need to create a bucket in the cloud storage and generate a service account with the Storage Admin role. These details are necessary to populate the environment variables.

## Prerequisites

- Node.js version 18 or higher
- PostgreSQL version 15 or higher
- Create a Cloud Storage Bucket: Create a bucket in your cloud storage provider (e.g., Google Cloud Storage, Amazon S3) where the application will store CSV files. Make a note of the bucket name as you'll need it later.
- Create a Service Account: Create a service account in your cloud storage provider with the necessary permissions to access and manage the created bucket. This will allow the application to interact with the cloud storage.

## Installation

1. Clone the repository:

```
git clone https://github.com/Fraud-Busters/backend.git
```

2. Navigate to the project directory:

```
cd backend
```

3. Install the dependencies:

```
npm install
```

## Configuration

1. Rename the `.env.example` file to `.env`.
2. Open the `.env` file and update the following configurations:
   - `PORT`: The port on which the server will run.
   - `NODE_ENV`: The environment mode (e.g., development, production).
   - `JWT_ACCESS_SECRET`: Secret key for JWT access tokens.
   - `JWT_REFRESH_SECRET`: Secret key for JWT refresh tokens.
   - `DATABASE_URL`: URL for connecting to your PostgreSQL database.
   - `ORIGIN`: Allowed origin for CORS.
   - `GCP_PRIVATE_KEY`: The private key for the service account used for cloud storage access.
   - `GCP_CLIENT_EMAIL`: The email address associated with the service account.
   - `GCP_PROJECT_ID`: The project ID associated with the service account.
   - `GCP_BUCKET_NAME`: The name of the bucket created in the cloud storage.
   - `MONGO_URI`: URI for connecting to your MongoDB database.

## Database Setup

1. Ensure you have PostgreSQL and MongoDB installed and running.
2. Create a new PostgreSQL database for the project.
3. Update the `DATABASE_URL` configuration in the `.env` file with the connection URL for your PostgreSQL database.
4. Update the `MONGO_URI` configuration in the `.env` file with the connection URI for your MongoDB database.
5. Run this command to create the PostgreSQL database schema and tables, and also to generate prisma client:

```
npm run migrate:generate
```

## Run the Server

1. Start the server:

```
npm start
```

2. The server will start running on `http://localhost:<port>`.

## Endpoints

The application provides the following three authentication endpoints:

- `POST /api/v1/auth/login`: Allows users to log in with credentials and obtain an access token and refresh token.
- `GET /api/v1/auth/logout`: Enables users to remove the refresh token from the server.
- `GET /api/v1/auth/refresh`: Provides a new access token and refresh token. The system verifies the existing refresh token in the HTTP-only cookie to generate new access and refresh tokens.

Additionally, there are four protected endpoints that require an access token to access:

- `GET /api/v1/predictions`: Retrieves a list of prediction results.
- `DELETE /api/v1/predictions/:id`: Deletes a prediction result with a specific ID.
- `POST /api/v1/upload`: Uploads a CSV file for analysis and prediction using machine learning.
- `GET /api/v1/download/:id`: Downloads the analyzed or predicted CSV file.

## Usage

Once the application is up and running, you can use the defined endpoints to interact with the system.

### Authentication Endpoints

1. `POST /api/v1/auth/login`

   Use this endpoint to log in with credentials and obtain an access token, refresh token (will be set in http only cookie), and the user information.

   Request body:

   ```json
   {
     "username": "<username>",
     "password": "<password>"
   }
   ```

   Response:

   ```json
   {
     "accessToken": "<access-token>",
     "user": {
       "id": "<user-id>",
       "role": "<role>",
       "username": "<username>"
     }
   }
   ```

2. `GET /api/v1/auth/logout`

   Use this endpoint to remove the refresh token from the server.

   Response:

   ```json
   {
     "ok": true
   }
   ```

3. `GET /api/v1/auth/refresh`

   Use this endpoint to obtain a new access token and refresh token. The system verifies the existing refresh token in the HTTP-only cookie to generate new access and refresh tokens.

   Response:

   ```json
   {
     "accessToken": "<new-access-token>",
     "user": {
       "id": "<user-id>",
       "role": "<role>",
       "username": "<username>"
     }
   }
   ```

### Protected Endpoints

To access the protected endpoints, include the access token in the `Authorization` header of the request.

1. `GET /api/v1/predictions`

   Use this endpoint to retrieve a list of prediction results.

   Response:

   ```json
   {
     "ok": true,
     "data": [
       {
         "id": "<prediction-id>",
         "filename": "<filename>",
         "outKey": "<outKey | undefined>",
         "inKey": "<inKey>",
         "username": "<username>",
         "createdAt": "<createdAt>",
         "updatedAt": "<updatedAt>",
         "status": "<status>",
         "previewResult": [
           ["<data>", "<data>"],
           ["<data>", "<data>"]
         ]
       }
     ]
   }
   ```

2. `DELETE /api/v1/predictions/:id`

Use this endpoint to delete a prediction result with a specific ID.

Response:

```json
{
  "ok": true
}
```

3. `POST /api/v1/upload`

   Use this endpoint to upload a CSV file for analysis and prediction using machine learning. The file should be sent as `multipart/form-data` with the key `file`.

   Response:

   ```json
   {
     "ok": true,
     "message": "File uploaded successfully"
   }
   ```

4. `GET /api/v1/download/:id`

   Use this endpoint to download the analyzed or predicted CSV file with the specified ID.

   Response: The file will be downloaded.
