import express from "express";
import { mqttReq } from "../../index.js";

const router = express.Router();

/**
 * @typedef TimeslotsQueryParams
 * @property {string} [start] 
 */

/**
 * Get /v1/timeslots
 * @summary Returns all timeslots sorted ASC by start time
 * @tags timeslots
 * @param {TimeslotsQueryParams} query.start - all timeslots later than this time
 * @return {object} 200 - Success response
 * @return {object} 404 - start time not found
 */

router.get("/", async (req, res, next) => {
    mqttReq.request(
        "v1/timeslots",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify({startTime: req.query.startTime})
    )
})

export default router
