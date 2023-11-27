import express from "express";
const router = express.Router()
import { mqttReq } from "../../index.js"

/**
 * Get /v1/users/{userId}
 * @summary Returns user by id
 * @tags users
 * @return {object} 200 - Success response
 * @return {object} 404 - user id not found
 */
router.get("/:userId", async (req, res) => {

    try {
        const userID = req.params.id;
        const userToFind = await Users.findById(userID);
        if (!userToFind) {
            res.status(404).json({ message: "User ID not found." });
        }
        res.status(200).json(userToFind);
    } catch (err) {
        res.status(500).json({ message: "Internal server error." })
    }
});

/**
* Get /v1/users/{userId}/notifications
* @summary Returns all notifications of a user by id
* @tags users
* @return {object} 200 - Success response
* @return {object} 404 - user id not found
*/
router.get("/:userId/notifications", async (req, res) => {

    try {
        const userID = req.params.id;
        const userToFind = await Users.findById(userID);
        if (!userToFind) {
            res.status(404).json({ message: "User ID not found." })
        }

        const notifications = await Notifications.exec();
        res.status(200).json(notifications);

    } catch (err) {
        res.status(500).json({ message: "Internal server error." })
    }
});


/**
 * Get /v1/users/{userId}/appointments
 * @summary Returns all appointments of a user by id
 * @tags users
 * @return {object} 200 - Success response
 * @return {object} 404 - user id not found
 */
router.get("/:userId/appointments", async (req, res) => {

    try {
        const userID = req.params.id;
        const userToFind = await Users.findById(userID);
        if (!userToFind) {
            res.status(404).json({ message: "User ID not found." })
        }

        const appointments = await Appointments.exec();
        res.status(200).json(appointments);

    } catch (err) {
        res.status(500).json({ message: "Internal server error." })
    }
}

);


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







