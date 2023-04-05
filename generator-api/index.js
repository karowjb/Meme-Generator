const app = require("../generator-api/server");
//Specifying ports
PORT = 5555;
app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT);
});
