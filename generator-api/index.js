const express = require("express");
const dotenv = require("dotenv");

const app = require("../generator-api/server");

//Logging config

//Specifying ports
PORT = 5555;
app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT);
});
