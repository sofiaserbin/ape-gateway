import express from "express"
import { mqttReq } from "../../index.js";

const router = express.Router();

// TODO:
/**
 * Get /v1/users/{userId}
 * @summary Returns user by id
 * @tags users
 * @return {object} 200 - Success response
 * @return {object} 404 - user id not found
 */
router.get("/:userId", async (req, res, next) => {
    mqttReq.request(
        "v1/users/:userId",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify(req.params.userId)
    )
});

/**
 * Patch /v1/users/{userId}
 * @summary Updates user by id
 * @tags users
 * @return {object} 200 - Success response
 * @return {object} 404 - user id not found
 */
router.patch("/:userId", async (req, res, next) => {
  const payload = {
    userId: req.params.userId,
    requestBody: req.body
  };

  console.log('API Gateway Request Payload:', payload);

  mqttReq.request(
    "v1/users/update",
    (responsePayload) => {
      console.log('API Gateway Response Payload:', responsePayload);
      req.mqttResponse = responsePayload;
      return next();
    },
    JSON.stringify(payload)
  );
});



// TODO:
/**
* Get /v1/users/{userId}/notifications
* @summary Returns all notifications of a user by id
* @tags users
* @return {object} 200 - Success response
* @return {object} 404 - user id not found
*/
router.get("/:userId/notifications", async (req, res, next) => {
    mqttReq.request(
        "v1/users/:userId/notifications",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify(req.params.userId)
    )
});

// TODO:
/**
 * Get /v1/users/{userId}/appointments
 * @summary Returns all appointments of a user by id
 * @tags users
 * @return {object} 200 - Success response
 * @return {object} 404 - user id not found
 */
router.get("/v1/users/:userId/appointments", async (req, res) => {
    mqttReq.request(
        "v1/users/:userId/appointments",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify(req.params.userId)
    )
});

/**
 * Post /v1/users/login
 * @summary Logs in a user
 * @tags users
 * @return {object} 200 - Success response
 * @return {object} 400 - Bad request response
 */
router.post("/login", async (req, res, next) => {
    mqttReq.request("v1/users/login",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify(req.body)
    )
});


/**
 * Post /v1/users/register
 * @summary Registers a user
 * @tags users
 * @return {object} 201 - Success response
 * @return {object} 400 - Bad request response
 */
router.post("/register", async (req, res, next) => {
    mqttReq.request("v1/users/register",
        (payload) => {
            req.mqttResponse = payload
            return next()
        },
        JSON.stringify(req.body)
    )

});

/**
 * Patch /v1/dentists/{dentistId}/ratings
 * @summary Creates a new rating for dentist
 * @tags dentists
 * @return {object} 200 - Success response
 * @return {object} 400 - Bad request response
 */
router.patch("/dentists/:dentistId", (req, res, next) => {
    mqttReq.request(
        "v1/dentists/ratings/create",
        (payload) => {
            req.mqttResponse = payload;
            return next();
        },
        JSON.stringify({dentistId: req.params.dentistId, rating: req.body.rating, favorite_dentist: req.body.favorite_dentist, token: req.token })
    );
});


export default router
