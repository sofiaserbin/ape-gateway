import express from "express";
const router = express.Router();
import { mqttReq } from "../../index.js";

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
      JSON.stringify(req.body)
    )
  })


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
    JSON.stringify({appointmentId: req.params.appointmentId})
    )
    
  });

/**
 * Patch /v1/appointments/{appointmentId}
 * @summary Updates an appointment by appointment id
 * @tags appointments
 * @return {object} 200 - Success response
 * @return {object} 404 - appointment id not found
 */
router.patch("/:appointmentId", async (req, res, next) => {
    const payload = {
        appointmentId: req.params.appointmentId,
        requestBody: req.body
    };
    mqttReq.request(
        "v1/appointments/update",
        (responsePayload) => {
            req.mqttResponse = responsePayload;
            return next();
        },
        JSON.stringify(payload)
    );
});

export default router;
