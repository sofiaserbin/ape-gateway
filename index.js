import express from "express"
import * as mqtt from "mqtt"
import expressJSDocSwagger from "express-jsdoc-swagger";
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const apiDocsRoute = "/api-docs";

const client = mqtt.connect(process.env.BROKER_URL)

const app = express()
const port = process.env.PORT || 3000

const options ={
    info: {
        version: "1.0.0",
        title: "Entoothiast",
    },
    baseDir: __dirname,
    filesPattern: "./**/*.js",
    // URL where SwaggerUI will be rendered. Default. /api-docs
    swaggerUIPath: apiDocsRoute,
    exposeSwaggerUI: true,

    exposeApiDocs: false,
    // Open API JSON Docs endpoint.
    apiDocsPath: "/api-docs",
    notRequiredAsNullable: false,
    swaggerUiOptions: {},
    multiple: true,
};

expressJSDocSwagger(app)(options);


app.get('/', (req, res) => {
    res.send('Hi from api-gateway')
})





client.on("connect", () => {
    console.log("api-gateway connected to broker")
    console.log(`Broker URL: ${process.env.BROKER_URL}`)
    

    app.listen(port, () => {
        console.log(`API-Gateway running on http://localhost:${port}`)
        console.log(`API Docs running on http://localhost:${port}${apiDocsRoute}`)
    })
});