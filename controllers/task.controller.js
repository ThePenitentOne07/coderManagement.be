const { sendResponse, AppError } = require("../helpers/utils.js");
const Task = require("../models/Task");

const taskController = {};

// Create a new task
taskController.createTask = async (req, res, next) => {
    try {
        const { name, description, status, assignedTo } = req.body;

        if (!name || !description) {
            throw new AppError(400, "Bad Request", "Name and description are required");
        }

        const newTask = await Task.create({ name, description, status, assignedTo });

        sendResponse(res, 200, true, { task: newTask }, null, "Create Task Successfully");
    } catch (err) {
        next(err);
    }
};

// Get a single task by Id with populated User details
taskController.getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id).populate("assignedTo");

        if (!task) {
            return next(new AppError(404, "Task not found", "Task Not Found"));
        }

        sendResponse(res, 200, true, { task }, null, "Get Task Successfully");
    } catch (err) {
        next(err);
    }
};

// Get all tasks with populated User details
taskController.getTasks = async (req, res, next) => {
    const { name, status, createdAt, updatedAt } = req.query;
    const filter = {};

    if (name) filter.name = new RegExp(name, 'i');
    if (status) filter.status = status;
    if (createdAt) filter.createdAt = { $gte: new Date(createdAt) };
    if (updatedAt) filter.updatedAt = { $gte: new Date(updatedAt) };

    try {
        const tasks = await Task.find(filter).populate("assignedTo");

        if (!tasks.length) {
            return sendResponse(res, 404, false, null, "No tasks found", "No tasks found with the specified criteria");
        }

        sendResponse(res, 200, true, { tasks }, null, "Get Tasks Successfully");
    } catch (err) {
        next(err);
    }
};

// Update the status of a task
taskController.updateTaskStatus = async (req, res, next) => {
    const targetId = req.params.id;
    const { status } = req.body;

    if (!status) {
        return next(new AppError(400, "Bad Request", "Status is required"));
    }

    const options = { new: true };

    try {
        const task = await Task.findById(targetId);

        if (!task) {
            return next(new AppError(404, "Task not found", "Task Not Found"));
        }

        if (task.status === 'done' && status !== 'archive') {
            return next(new AppError(400, "Bad Request", "Cannot change status after done except to archive"));
        }

        task.status = status;
        task.updatedAt = Date.now();

        const updatedTask = await task.save();

        sendResponse(res, 200, true, { task: updatedTask }, null, "Update Task Status Successfully");
    } catch (err) {
        next(err);
    }
};

// Assign a task to a user
taskController.assignTask = async (req, res, next) => {
    const targetId = req.params.id;
    const { userId } = req.body;

    if (!userId) {
        return next(new AppError(400, "Bad Request", "User ID is required"));
    }

    try {
        const task = await Task.findById(targetId);

        if (!task) {
            return next(new AppError(404, "Task not found", "Task Not Found"));
        }

        task.assignedTo = userId || null;
        task.updatedAt = Date.now();

        const updatedTask = await task.save();

        sendResponse(res, 200, true, { task: updatedTask }, null, "Assign Task Successfully");
    } catch (err) {
        next(err);
    }
};

// Soft delete a task
taskController.deleteTask = async (req, res, next) => {
    const targetId = req.params.id;

    if (!targetId) {
        return next(new AppError(400, "Bad Request", "Task ID is required"));
    }

    try {
        const task = await Task.findById(targetId);

        if (!task) {
            return next(new AppError(404, "Task not found", "Task Not Found"));
        }

        task.deletedAt = Date.now();

        const deletedTask = await task.save();

        sendResponse(res, 200, true, { task: deletedTask }, null, "Soft Delete Task Successfully");
    } catch (err) {
        next(err);
    }
};

module.exports = taskController;
