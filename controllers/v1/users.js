import express from "express"
import { mqttReq } from "../../index.js";
const router = express.Router();
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


export default router
