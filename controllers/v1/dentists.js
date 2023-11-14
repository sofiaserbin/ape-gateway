const router = require("express").Router();

/**
 * Get /v1/dentists
 * @summary Returns all dentists
 * @tags dentists
 * @return {object} 200 - Success response
 */
router.get("/v1/dentists",
    //TODO: not implemented yet
);

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

