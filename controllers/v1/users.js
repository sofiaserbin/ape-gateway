const router = require("express").Router();

/**
 * Get /v1/users/{userId}
 * @summary Returns user by id
 * @tags users
 * @return {object} 200 - Success response
 * @return {object} 404 - user id not found
 */
router.get("/v1/users/:userId",
    //TODO: not implemented yet
);
 /**
 * Get /v1/users/{userId}/notifications
 * @summary Returns all notifications of a user by id
 * @tags users
 * @return {object} 200 - Success response
 * @return {object} 404 - user id not found
 */
router.get("/v1/users/:userId/notifications",
//TODO: not implemented yet
);


/**
 * Get /v1/users/{userId}/appointments
 * @summary Returns all appointments of a user by id
 * @tags users
 * @return {object} 200 - Success response
 * @return {object} 404 - user id not found
 */
router.get("/v1/users/:userId/appointments",
    //TODO: not implemented yet
);


/**
 * Post /v1/users/login
 * @summary Logs in a user
 * @tags users
 * @return {object} 200 - Success response
 * @return {object} 400 - Bad request response
 */
router.post("v1/users/login",
    //TODO: not implemented yet
);


/**
 * Post /v1/users/register
 * @summary Registers a user
 * @tags users
 * @return {object} 201 - Success response
 * @return {object} 400 - Bad request response
 */
router.post("/v1/users/register",
    //TODO: not implemented yet
);










