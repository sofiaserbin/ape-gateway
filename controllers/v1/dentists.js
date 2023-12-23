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
 * Delete /v1/dentists/{dentistId}/timeslots/{timeslotId}
 * @summary Deletes a timeslot by id of a dentist by id
 * @tags dentists
 * @return {object} 200 - Success response
 * @return {object} 404 - dentist id not found
 * @return {object} 404 - timeslot id not found
 */
router.delete("/:dentistId/timeslots/:timeslotId", (req, res, next) =>{
    mqttReq.request("v1/timeslots/delete",
        (payload) => {
        req.mqttResponse = payload
        return next()
        },
    JSON.stringify({dentistId: req.params.dentistId, timeslotId: req.params.timeslotId})
    )
    });

/**
 * Post /v1/dentists/timeslots
 * @summary Creates a new timeslot of a dentist by id 
 * @tags dentists
 * @return {object} 200 - Success response
 * @return {object} 404 - dentist id not found
 */
router.post("/timeslots", (req, res, next) =>{
    let dentist_token = '';
    console.log(req.get("Authorization"))
    if (req.get("Authorization")) {
        const authHeader = req.get("Authorization");
        console.log(authHeader)
        dentist_token = authHeader.split(' ')[1];
    }
    mqttReq.request("v1/timeslots/create",
        (payload) => {
        req.mqttResponse = payload
        return next()
        },
    JSON.stringify({start_time : req.body.start_time, end_time: req.body.end_time, token: dentist_token})
    );
    });

/**
 * Post /v1/dentists/{dentistId}/ratings
 * @summary Creates a new rating for dentist
 * @tags dentists
 * @return {object} 200 - Success response
 * @return {object} 400 - Bad request response
 */
router.post("/:dentistId/ratings", (req, res, next) => {
    let user_token = '';
    console.log(req.get("Authorization"))
    if (req.get("Authorization")) {
        const authHeader = req.get("Authorization");
        console.log(authHeader)
        user_token = authHeader.split(' ')[1];
        console.log(user_token)
    }

    mqttReq.request(
        "v1/dentists/ratings/create",
        (payload) => {
            req.mqttResponse = payload;
            // Handle your MQTT response here
            return next();
        },
        JSON.stringify({ token: user_token, dentistId: req.params.dentistId, rating: req.body.rating})
    );
    });



export default router


