const router = require("express").Router();

/**
 * Get /v1/users/{userId}
 * @summary Returns user by id
 * @tags users
 * @return {object} 200 - Success response
 * @return {object} 404 - user id not found
 */
router.get("/v1/users/:userId", getUserById = async (req,res) => {
    
    try {
        const userID = req.params.id;
        const userToFind = await Users.findById(userID);
        if (!userToFind) {
            res.status(404).josn({ message: "User ID not found."});
        }
        res.status(200).json(userToFind);
    } catch (err) {
        res.status(500).json({ message: "Internal server error."})
    }
});

 /**
 * Get /v1/users/{userId}/notifications
 * @summary Returns all notifications of a user by id
 * @tags users
 * @return {object} 200 - Success response
 * @return {object} 404 - user id not found
 */
router.get("/v1/users/:userId/notifications", getUserNotifications = async (req, res) => {

try {
    const userID = req.params.id;
    const userToFind = await Users.findById(userID);
    if (!userToFind) {
        res.status(404).json({ message: "User ID not found."})
    }

    const notifications = await Notifications.exec();
    res.status(200).json(notifications);

} catch (err) {
    res.status(500).json({ message: "Internal server error."})
}
});


/**
 * Get /v1/users/{userId}/appointments
 * @summary Returns all appointments of a user by id
 * @tags users
 * @return {object} 200 - Success response
 * @return {object} 404 - user id not found
 */
router.get("/v1/users/:userId/appointments", getUserAppointments = async (req, res) => {

try {
    const userID = req.params.id;
    const userToFind = await Users.findById(userID);
    if (!userToFind) {
        res.status(404).json({ message: "User ID not found."})
    }

    const appointments = await Appointments.exec();
    res.status(200).json(appointments);

} catch (err) {
    res.status(500).json({ message: "Internal server error."})
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
router.post("/v1/users/register", registerUser = async (req, res) => {
  
    console.log(req);
    const users = new Users({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        clinic_id: req.body.clinic,
        user_role: req.body.role,
    });

    try {
        const userToSave = await users.save();
        res.status(201).json(userToSave);
    } catch (err) {
        res.status(400).json({ message: "User not registered, please try again"});
    }

});










