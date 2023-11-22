import pgp from "pg-promise";
import express from "express";
import mqttReq from "../..";

const router = express.Router();
const db = pgp({})({
  connectionString: process.env.CONNECTION_STRING,
});

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

router.get("/v1/timeslots", async (req, res) => {

    const sTime = req.params.startTime || Date.now();

    db.any('SELECT * FROM timeslot WHERE start_time = ${time} ORDER BY start_time ASC', 
    {
        time: sTime
    })
    .then(data => {
        console.log(data);
        res.status(200).json({data});
    }).catch(error => {
        console.log(error);
        res.status(404).json({message: 'Start time not found.'})
    });
});
