const { sendResponse, AppError } = require("../helpers/utils.js");
const User = require("../models/User");
const Task = require("../models/Task");

const userController = {};

// Create a new user
userController.createUser = async (req, res, next) => {
    try {
        const { name, role } = req.body;

        if (!name) {
            throw new AppError(400, "Bad Request", "Name is required");
        }

        const newUser = await User.create({ name, role: role || 'employee' });

        sendResponse(res, 200, true, { user: newUser }, null, "Create User Successfully");
    } catch (err) {
        next(err);
    }
};

// Get all users
userController.getUsers = async (req, res, next) => {
    const { name, role } = req.query;
    const filter = {};

    if (name) filter.name = new RegExp(name, 'i');
    if (role) filter.role = role;

    try {
        const users = await User.find(filter);

        if (!users.length) {
            return sendResponse(res, 404, false, null, "No users found", "No users found with the specified criteria");
        }

        sendResponse(res, 200, true, { users }, null, "Get Users Successfully");
    } catch (err) {
        next(err);
    }
};

// Get a single user by Id
userController.getUserById = async (req, res, next) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new AppError(404, "User not found", "User Not Found"));
        }

        // Find tasks assigned to this user
        const tasks = await Task.find({ assignedTo: user._id });

        // Combine user details with their tasks
        const userWithTasks = {
            ...user.toObject(), // Convert the user document to a plain JavaScript object
            tasks, // Add the tasks array
        };

        sendResponse(res, 200, true, { user: userWithTasks }, null, "Get User and Tasks Successfully");
    } catch (err) {
        next(err);
    }
};

// Search for an employee by name
userController.searchUserByName = async (req, res, next) => {
    try {
        const { name } = req.query;
        const users = await User.find({ name: new RegExp(name, 'i') });

        if (!users.length) {
            return sendResponse(res, 404, false, null, "No users found", "No users found with the specified criteria");
        }

        sendResponse(res, 200, true, { users }, null, "Search User Successfully");
    } catch (err) {
        next(err);
    }
};

// Get all tasks of a user by user Id


module.exports = userController;
