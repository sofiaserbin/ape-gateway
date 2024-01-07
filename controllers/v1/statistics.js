import express from "express";
const router = express.Router()
import { mqttReq } from "../../index.js"

/**
 * Get /v1/statistics/most-used-dentist/users/{userId}
 * @summary Returns all clinics
 * @tags clinics
 * @return {object} 200 - Success response
 */
router.get("/most-used-dentist/users/:userId", async (req, _, next) => {
    console.log("hi")
    mqttReq.request("v1/statistics/most-used-dentist/users/read",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify({ token: req.token, userId: req.params.userId })
    )
});


/**
 * Get /v1/statistics/appointments-in-year/users/:userId
 * @summary Returns all clinics
 * @tags clinics
 * @return {object} 200 - Success response
 */
router.get("/appointments-in-year/users/:userId", async (req, _, next) => {
    console.log("hi")
    mqttReq.request("v1/statistics/appointments-in-year/users/read",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify({ token: req.token, userId: req.params.userId })
    )
});

export default router