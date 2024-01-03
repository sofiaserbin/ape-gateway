/// Middleware to set http status code based on payload from mqtt response
/// make sure this is middleware is declared after all the controller handlers
const mqttResponseIntegrationHandler = (req, res, next) => {
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
}

export default mqttResponseIntegrationHandler