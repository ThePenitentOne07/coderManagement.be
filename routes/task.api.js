const express = require("express");
const router = express.Router();
const {
    createTask,
    getTasks,
    getTaskById,
    updateTaskStatus,
    assignTask,
    deleteTask,
} = require("../controllers/task.controller.js");

// Read all tasks
/**
 * @route GET api/tasks
 * @description Get a list of tasks
 * @access Public
 */
router.get("/", getTasks);

// Read a single task by ID
/**
 * @route GET api/tasks/:id
 * @description Get a task by ID
 * @access Public
 */
router.get("/:id", getTaskById);

// Create a new task
/**
 * @route POST api/tasks
 * @description Create a new task
 * @access Public
 */
router.post("/", createTask);

// Update the status of a task
/**
 * @route PATCH api/tasks/:id/status
 * @description Update the status of a task
 * @access Public
 */
router.patch("/:id/status", updateTaskStatus);

// Assign or unassign a task to a user
/**
 * @route PATCH api/tasks/:id/assign
 * @description Assign or unassign a task to a user
 * @access Public
 */
router.patch("/:id/assign", assignTask);

// Delete (soft delete) a task
/**
 * @route DELETE api/tasks/:id
 * @description Soft delete a task
 * @access Public
 */
router.delete("/:id", deleteTask);

module.exports = router;
