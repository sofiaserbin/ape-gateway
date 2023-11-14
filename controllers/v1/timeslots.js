const router = require("express").Router();

/**
 * Get /v1/timeslots?sort=start_time
 * @summary Returns all timeslots sorted ASC by start time
 * @tags timeslots
 * @return {object} 200 - Success response
 * @return {object} 404 - start time not found
 */
router.get("/v1/timeslots?sort=start_time",
    //TODO: not implemented yet
);
