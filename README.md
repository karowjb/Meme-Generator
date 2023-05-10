# capstone-memegen

## Senior Capstone Project - John Karow

<hr>

This is a web application that allows users to create and customize their own memes. Users can upload their own image or use one of the pre-existing images, and can also enter their own text. The application supports customizing the text color, size, position, and font family. Users can export their created meme as a PNG file.

## Setting up the project locally

<hr>

### Installation

To run the application, clone the repository and install the necessary dependencies using the following commands:

```
git clone https://github.com/karowjb/Meme-Generator.git
cd capstone-memegen
npm install
```

### How it works

The application is built using React and HTML5 canvas. The user interface is built using React components, while the canvas is used to render the image and text. Users can upload their own image or use one of the pre-existing images, and can also enter their own text. The text can be customized in terms of color, size, position, and font family. Once the user is satisfied with their meme, they can export it as a PNG file.

## Requirements

<hr>
When setting up this project there are a couple things that are required to make it work.

### Environment Variables

Example of .env just insert your data here. This is needed to pass configuration variables to all parts of the app.

```
HOST = localhost
USER =
DATABASE = memegen
PASSWORD =
PORT = 3306
ACCESSKEYID =
ACCESSSECRET =
S3BUCKETNAME = capstone-memegenerator
AWSREGION = us-east-1
ENCRYPTION = AES256
```

### S3 Bucket

-   There must be an AWS S3 bucket called `capstone-memegenerator`

    -   For this to work you will also need...

        -   An AWS Secret Acccess Key
        -   An AWS Access Key ID
        -   S3ManagedEncryption: `AES256`

    -   This data will need to be stored in a `.env` file in the `generator-api` base folder.

    Store all images in this bucket.

### Database

-   The project uses a MariaDB database using 2 main tables memes and quotes.
-   Use the SQL script called `dbCreate.sql` in the `/generator-db` folder to create a local db.
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

-   `Start` is the generic run command.
-   `swagger-autogen` creates documentation.
-   `dev` creates a service that will restart on errors.
-   `test` runs the unit tests locally.

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

## License

This project is licensed under the APACHE License - see the [LICENSE](LICENSE) file for details.
