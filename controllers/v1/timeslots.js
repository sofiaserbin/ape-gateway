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
 * @param {TimeslotsQueryParams} query.start_time - all timeslots later than this time
 * @param {TimeslotsQueryParams} query.clinic - all timeslots at this clinic
 * @param {TimeslotsQueryParams} query.dentist - all timeslots of this dentist
 * @return {object} 200 - Success response
 * @return {object} 404 - start time not found
 */

router.get("/", async (req, res, next) => {
    mqttReq.request(
        "v1/timeslots/read",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify({ startTime: req.query.startTime, token: req.token, clinic: req.query.clinic, dentist: req.query.dentist })
    )
})

export default router
