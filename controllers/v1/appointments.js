import express from "express";
const router = express.Router();
import { mqttReq } from "../../index.js";

/**
* Get /v1/appointments
* @summary Returns all appointments
* @tags appointments
* @return {object} 200 - Success response
*/
router.get("/", async (req, res, next) => {
    mqttReq.request("v1/appointments/all",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify({ token: req.token })
    )

});

/**
 * Get /v1/appointments/{appointmentId}
 * @summary Returns appointment by id
 * @tags appointments
 * @return {object} 200 - Success response
 * @return {object} 404 - appointment id not found
 */
router.get("/:appointmentId", async (req, res, next) => {
    mqttReq.request("v1/appointments/read",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify({ appointmentId: req.params.appointmentId, token: req.token })
    )
});

/**
 * Post /v1/appointments
 * @summary Creates a new appointment
 * @tags appointments
 * @return {object} 200 - Success response
 * @return {object} 400 - Bad request response
 */
router.post("/", async (req, res, next) => {
    mqttReq.request(
        "v1/appointments/create",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify({ body: req.body, token: req.token })
    )
})


/**
 * Patch /v1/appointments/{appointmentId}
 * @summary Updates an appointment by appointment id
 * @tags appointments
 * @return {object} 200 - Success response
 * @return {object} 404 - appointment id not found
 */
router.patch("/:appointmentId", async (req, res, next) => {
    mqttReq.request(
        "v1/appointments/update",
        (responsePayload) => {
            req.mqttResponse = responsePayload;
            return next();
        },
        JSON.stringify({ appointmentId: req.params.appointmentId, requestBody: req.body, token: req.token })
    );
});

export default router;
