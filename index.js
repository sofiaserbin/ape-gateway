import express from "express"
import * as mqtt from "mqtt"
import expressJSDocSwagger from "express-jsdoc-swagger";
import path from 'path';
import { fileURLToPath } from 'url';
import MqttRequest from "mqtt-request"
import userRouter from "./controllers/v1/users.js"
import bodyparser from "body-parser"
import morgan from "morgan"

const app = express()
const port = process.env.PORT || 3000

// Logging middleware
app.use(morgan("dev"))

// Body parser middleware to parse JSON body
app.use(bodyparser.json())

// Swagger middleware
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiDocsRoute = "/api-docs";
const options = {
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

// Router middlewares

app.use("/v1/users", userRouter)

app.get('/', (req, res) => {
    return res.send('Hi from api-gateway')
})

app.get("/demo", (req, res) => {
    mqttReq.request("demo", // topic "demo"
        // callback that is called when the other serice replies
        (payload) => {
            return res.send(payload)
        },
        // payload that is sent to the other service
        JSON.stringify({ message: "Hi from API-Gateway..." }))
})

// Middleware to set http status code based on payload from mqtt response
// make sure this is middleware is declared after all the controller handlers
app.use((req, res, next) => {
    if (!req.mqttResponse) {
        console.log("Skipping middleware; no mqttResponse set on req")
        return res.status(500).send()
    }
    const payload = JSON.parse(req.mqttResponse)
    const httpStatus = payload.httpStatus || 200

    // in http, we have the status code in the header anyway
    // no reason to send it in the payload as well
    delete payload.httpStatus

    return res.status(httpStatus).json(payload)
})

// Start MQTT client and Express.js
const client = mqtt.connect(process.env.BROKER_URL)
export const mqttReq = new MqttRequest.default(client);
client.on("connect", () => {
    console.log("api-gateway connected to broker")
    console.log(`Broker URL: ${process.env.BROKER_URL}`)


    app.listen(port, () => {
        console.log(`API-Gateway running on http://localhost:${port}`)
        console.log(`API Docs running on http://localhost:${port}${apiDocsRoute}`)
    })
});