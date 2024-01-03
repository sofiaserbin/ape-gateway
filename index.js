import express from "express"
import * as mqtt from "mqtt"
import expressJSDocSwagger from "express-jsdoc-swagger";
import MqttRequest from "mqtt-request"
import userRouter from "./controllers/v1/users.js"
import logsRouter from "./controllers/v1/logs.js"
import dentistRouter from "./controllers/v1/dentists.js"
import timeslotRouter from "./controllers/v1/timeslots.js"
import bodyparser from "body-parser"
import morgan from "morgan"
import { options } from "./middleware/swagger.js"
import cors from "cors"
import clinicsRouter from "./controllers/v1/clinics.js"
import appointmentsRouter from "./controllers/v1/appointments.js"
import parseAuthHeader from "./middleware/parse-auth-header.js";
import errorHandler from "./middleware/error-handler.js";
import mqttResponseIntegrationHandler from "./middleware/mqtt-response-integration.js";

const app = express()
const port = process.env.PORT || 3000

app.use(bodyparser.json()) // parse json body
app.use(morgan("dev")) // logging
app.options("*", cors());
app.use(cors());
expressJSDocSwagger(app)(options); // swagger api docs
app.use(parseAuthHeader) // custom middleware to put auth token in req.token


app.get('/', (_, res) => res.send('API-Gateway running'))
app.use("/v1/clinics", clinicsRouter);
app.use("/v1/users", userRouter);
app.use("/v1/timeslots", timeslotRouter);
app.use("/v1/appointments", appointmentsRouter);
app.use("/v1/dentists", dentistRouter)
app.use("/v1/logs", logsRouter)


app.use(errorHandler);
app.use(mqttResponseIntegrationHandler)


const client = mqtt.connect(process.env.BROKER_URL)
MqttRequest.timeout = 5000;
export const mqttReq = new MqttRequest.default(client);

client.on("connect", async () => {
    console.log("api-gateway connected to broker")
    console.log(`Broker URL: ${process.env.BROKER_URL}`)

    app.listen(port, () => {
        console.log(`API-Gateway running on http://localhost:${port}`)
        console.log(`API Docs running on http://localhost:${port}${options.swaggerUIPath}`)
    })
});