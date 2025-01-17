import express from "express";
const router = express.Router()
import { mqttReq } from "../../index.js"

/**
 * @typedef DentistsQueryParams
 * @property {string} [start] 
 * @property {string} [end] 
 * @property {string} [filter] 
 */

/**
 * Get /v1/dentists
 * @summary Returns all dentists
 * @tags dentists
 * @param {DentistsQueryParams} query.start - all timeslots starting this time
 * @param {DentistsQueryParams} query.end - all timeslots before this time
 * @param {DentistsQueryParams} query.filter - filter dentists (e.g., only favorite dentists)
 * @return {object} 200 - Success response
 */
router.get("/", (req, res, next) => {
    const queryParams = {
        start: req.query.start,
        end: req.query.end,
        filter: req.query.filter
    };

    mqttReq.request(
        "v1/dentists/read",
        (payload) => {
            req.mqttResponse = payload;
            return next();
        },
        JSON.stringify(queryParams)
    );
});

/**
 * Get /v1/dentists/timeslots
 * @summary Get all timeslots for a dentist
 * @tags dentists
 * @return {object} 200 - Success response
 * @return {object} 404 - Dentist id not found
 */
router.get("/:dentistId/timeslots", (req, res, next) => {
    mqttReq.request("v1/dentists/timeslots/read",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify({ dentistId: req.params.dentistId, token: req.token })
    )
});


/**
 * Post /v1/dentists/timeslots
 * @summary Creates a new timeslot of a dentist by id 
 * @tags dentists
 * @return {object} 200 - Success response
 * @return {object} 404 - dentist id not found
 */
router.post("/timeslots", (req, res, next) => {
    mqttReq.request("v1/timeslots/create",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify({
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            token: req.token
        })
    );
});

/**
 * Patch /v1/dentists/{userId}
 * @summary Updates dentist by id
 * @tags dentists
 * @return {object} 200 - Success response
 * @return {object} 404 - user id not found
 */
router.patch("/:userId", async (req, res, next) => {
    mqttReq.request(
        "v1/dentists/update",
        (responsePayload) => {
            req.mqttResponse = responsePayload;
            return next();
        },
        JSON.stringify({ userId: req.params.userId, requestBody: req.body })
    );
});


/**
 * Delete /v1/dentists/timeslots/{timeslotId}
 * @summary Deletes a timeslot by id of a dentist by id
 * @tags dentists
 * @return {object} 200 - Success response
 * @return {object} 404 - dentist id not found
 * @return {object} 404 - timeslot id not found
 */
router.delete("/timeslots/:timeslotId", (req, res, next) => {
    mqttReq.request("v1/timeslots/delete",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify({
            dentistId: req.params.dentistId,
            timeslotId: req.params.timeslotId,
            token: req.token
        })
    )
});

export default router
