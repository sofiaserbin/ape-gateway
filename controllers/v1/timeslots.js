const router = require("express").Router();

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
router.get("/v1/timeslots",
    //TODO: not implemented yet
);
