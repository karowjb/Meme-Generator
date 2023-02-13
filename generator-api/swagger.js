const swaggerAutogen = require('swagger-autogen')

const doc = {
    info: {
        version: "1.0.0",
        title: "Capstone Meme Generator",
        descripton: "Documentation for the meme generator"
    },
    host: "localhost:3000",
    basePath: '/',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json']
}
const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/memes.js', './routes/health.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index')
    // Your project's root file
})