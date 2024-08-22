const express = require("express");
const router = express.Router();
const {
    createUser,
    getUsers,
    getUserById,
    searchUserByName,
    getUserTasks,
} = require("../controllers/user.controller.js");

// Read all users
/**
 * @route GET api/users
 * @description Get a list of users
 * @access Public
 */
router.get("/", getUsers);

// Read a single user by ID
/**
 * @route GET api/users/:id
 * @description Get a user by ID
 * @access Public
 */
router.get("/:id", getUserById);

// Search users by name
/**
 * @route GET api/users/search
 * @description Search users by name
 * @access Public
 */
router.get("/search", searchUserByName);



// Create a new user
/**
 * @route POST api/users
 * @description Create a new user
 * @access Public
 */
router.post("/", createUser);

module.exports = router;
