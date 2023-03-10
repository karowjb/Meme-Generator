# capstone-memegen

## Senior Capstone Project

<hr>

This project is to create memes through a web interface.

## Setting up the project locally

<hr>
When setting up this project there are a couple things that are required to make it work.

### S3 Bucket

-   There must be an AWS S3 bucket called `capstone-memegenerator`

    -   For this to work you will also need...

        -   An AWS Secret Acccess Key
        -   An AWS Access Key ID
        -   `S3ManagedEncryption: "AES256"`

    -   This data will need to be stored in a `.env` file in the `generator-api` base folder.

### Database

-   The project uses a MariaDB database using 2 main tables memes and quotes.
-   Use the SQL script in the generator-db folder to create a local db.
    -   Credentials need to be stored in the `.env` file.

### Backend

-   Node JS must be installed.
-   Navigate to the `generator-api` folder
-   To install all packages run `npm install` this will create all modules needed.

```
"scripts": {
    "start": "node index.js",
    "test": "jest --coverage",
    "swagger-autogen": "node swagger.js",
    "dev": "nodemon index.js"
  }
```

These are the commands to run the backend for different purposes. Use like this: `npm run dev`

-   Start is the generic run
-   swagger-autogen creates documentation
-   dev creates a service that will restart on errors

### Frontend

Setup is similar to the backend.

-   Install React JS

```
npm install react
```

-   Navigate to the `generator-ui` folder
-   Run the `npm install` commmand
-   Run `npm run start` command

Now you should have the frontend and backend running concurrently.

Example of .env just insert your data here.

```
HOST = localhost
USER = root
DATABASE = memegen,
PASSWORD =
PORT = 3306
ACCESSKEYID =
ACCESSSECRET =
```
