import express from "express";
const router = express.Router()
import { mqttReq } from "../../index.js"

/**
 * Get /v1/statistics/most-used-dentist/users/{userId}
 * @summary Returns the most used dentist this year by the user
 * @tags user statistics
 * @return {object} 200 - Success response
 */
router.get("/most-used-dentist/users/:userId", async (req, _, next) => {
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
 * @summary Number of appointments the user has in the current year
 * @tags user statistics
 * @return {object} 200 - Success response
 */
router.get("/appointments-in-year/users/:userId", async (req, _, next) => {
    mqttReq.request("v1/statistics/appointments-in-year/users/read",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify({ token: req.token, userId: req.params.userId })
    )
});


/**
 * Get /v1/statistics/number-searches
 * @summary Number of timeslot searches in the last 5 minutes
 * @tags admin statistics
 * @return {object} 200 - Success response
 */
router.get("/number-searches", async (req, _, next) => {
    mqttReq.request("v1/statistics/number-searches/read",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify({ token: req.token })
    )
});


/**
 * Get /v1/statistics/timeslots-available
 * @summary Number of timeslots available
 * @tags admin statistics
 * @return {object} 200 - Success response
 */
router.get("/timeslots-available", async (req, _, next) => {
    mqttReq.request("v1/statistics/timeslots-available/read",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify({ token: req.token })
    )
});

export default router