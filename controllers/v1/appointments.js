const router = require("express").Router();

/**
 * Post /v1/appointments
 * @summary Creates a new appointment
 * @tags appointments
 * @return {object} 200 - Success response
 * @return {object} 400 - Bad request response
 */
router.post("/v1/appointments",
    //TODO: not implemented yet
);


/**
 * Get /v1/appointments/{appointmentId}
 * @summary Returns appointment by id
 * @tags appointments
 * @return {object} 200 - Success response
 * @return {object} 404 - appointment id not found
 */
router.get("/v1/appointments/:appointmentId",
    //TODO: not implemented yet
);


/**
 * Patch /v1/appointments/{appointmentId}
 * @summary Updates an appointment by appointment id
 * @tags appointments
 * @return {object} 200 - Success response
 * @return {object} 404 - appointment id not found
 */
router.patch("/v1/appointments/:appointmentId",
    //TODO: not implemented yet
);
