const router = require("express").Router();

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

/**
 * Delete /v1/dentists/{dentistId}/timeslots/{timeslotId}
 * @summary Deletes a timeslot by id of a dentist by id
 * @tags dentists
 * @return {object} 200 - Success response
 * @return {object} 404 - dentist id not found
 * @return {object} 404 - timeslot id not found
 */
router.delete("/v1/dentists/:dentistId/timeslots/timeslotId",
    //TODO: not implemented yet
);

/**
 * Post /v1/dentists/{dentistId}/timeslots
 * @summary Creates a new timeslot of a dentist by id 
 * @tags dentists
 * @return {object} 200 - Success response
 * @return {object} 404 - dentist id not found
 */
router.post("/v1/dentists/:dentistId/timeslots",
    //TODO: not implemented yet
);

/**
 * Post /v1/dentists/ratings
 * @summary Creates a new rating for dentist
 * @tags dentists
 * @return {object} 200 - Success response
 * @return {object} 400 - Bad request response
 */
router.post("/v1/dentists/ratings",
    //TODO: not implemented yet
);


