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
