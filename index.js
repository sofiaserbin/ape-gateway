import express from "express"
import * as mqtt from "mqtt"
import expressJSDocSwagger from "express-jsdoc-swagger";
import path from 'path';
import { fileURLToPath } from 'url';
import MqttRequest from "mqtt-request"
import userRouter from "./controllers/v1/users.js"
import logsRouter from "./controllers/v1/logs.js"
import dentistRouter from "./controllers/v1/dentists.js"
import timeslotRouter from "./controllers/v1/timeslots.js"
import bodyparser from "body-parser"
import morgan from "morgan"
import timeout from "connect-timeout"

MqttRequest.timeout = 5000;
import cors from "cors"
import clinicsRouter from "./controllers/v1/clinics.js"
import appointmentsRouter from "./controllers/v1/appointments.js"

const __filename = fileURLToPath(import.meta.url);

const app = express()
const port = process.env.PORT || 3000

app.use(bodyparser.json())

// Logging middleware
app.use(morgan("dev"))
app.options("*", cors());
app.use(cors());

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

app.use((req, res, next) => {
    if (req.get("Authorization")) {
        const authHeader = req.get("Authorization");
        if (authHeader.split(' ').length > 1 && authHeader.split(' ')[0] === 'Bearer') {
            req.token = authHeader.split(' ')[1];
        }
    }

    next()
})

app.use("/v1/clinics", clinicsRouter);
app.use("/v1/users", userRouter);
app.use("/v1/timeslots", timeslotRouter);
app.use("/v1/appointments", appointmentsRouter);
app.use("/v1/dentists", dentistRouter)
app.use("/v1/logs", logsRouter)

app.get('/', (req, res) => {
    return res.send('API-Gateway running')
})

app.use(function (err, req, res, next) {
    console.error(err.stack);

    res.status(err.status || 500);
    return res.send("Internal Server Error")
});


// Middleware to set http status code based on payload from mqtt response
// make sure this is middleware is declared after all the controller handlers
app.use((req, res, next) => {
    if (!req.mqttResponse) {
        console.log("Skipping middleware; no mqttResponse set on req")
        return res.status(500).send()
    }
    const payload = JSON.parse(req.mqttResponse)
    const httpStatus = payload.httpStatus || 200

    if (payload.hasOwnProperty("errorInternal")) {
        console.log(payload.errorInternal)
        delete payload.errorInternal
    }

    // in http, we have the status code in the header anyway
    // no reason to send it in the payload as well
    delete payload.httpStatus

    return res.status(httpStatus).json(payload)
})




// Start MQTT client and Express.js
const client = mqtt.connect(process.env.BROKER_URL)
export const mqttReq = new MqttRequest.default(client);// Miiddleware to set http status code based on payload from mqtt response
// make sure this middleware is declared after all the controller handlers
app.use((req, res, next) => {
    if (!req.mqttResponse) {
        console.log("Skipping middlewate; no mqttResponse set on req")
        return res.status(500).send()
    }
    const payload = JSON.parse(req.mqttResponse)
    const httpStatus = payload.httpStatus || 200

    // in http, we have the status code in the header anyway
    // no reason to send it in the payload as well
    delete payload.httpStatus

    return res.status(httpStatus).json(payload)
})

client.on("connect", async () => {
    console.log("api-gateway connected to broker")
    console.log(`Broker URL: ${process.env.BROKER_URL}`)



    app.listen(port, () => {
        console.log(`API-Gateway running on http://localhost:${port}`)
        console.log(`API Docs running on http://localhost:${port}${apiDocsRoute}`)
    })
});