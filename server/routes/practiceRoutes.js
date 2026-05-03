const express = require("express");
const router = express.Router();
const {
  getPracticeByModule,
  getPracticeBySubject,
  submitAnswer,
  createPractice,
} = require("../controllers/practiceController");

router.route("/").post(createPractice);
router.route("/subject/:subject").get(getPracticeBySubject);
router.route("/submit").post(submitAnswer);
router.route("/:moduleId").get(getPracticeByModule);

module.exports = router;
