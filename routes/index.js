const { sendResponse, AppError } = require("../helpers/utils.js");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("Welcome to CoderSchool!");
});

// router.get("/template/:test", async (req, res, next) => {
//   const { test } = req.params;
//   try {
//     //turn on to test error handling
//     if (test === "error") {
//       throw new AppError(401, "Access denied", "Authentication Error");
//     } else {
//       sendResponse(
//         res,
//         200,
//         true,
//         { data: "template" },
//         null,
//         "template success"
//       );
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// const carRouter = require("./car.api.js");
// router.use("/cars", carRouter);
const userRouter = require("./user.api.js");
router.use("/users", userRouter);
const taskRouter = require("./task.api.js");
router.use("/tasks", taskRouter)

module.exports = router;