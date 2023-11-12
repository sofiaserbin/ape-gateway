import express from "express"
import * as mqtt from "mqtt"

const client = mqtt.connect(process.env.BROKER_URL)

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hi from api-gateway')
})

client.on("connect", () => {
    console.log("api-gateway connected to broker")
    console.log(`Broker URL: ${process.env.BROKER_URL}`)

    app.listen(port, () => {
        console.log(`API-Gateway running on http://localhost:${port}`)
    })
});