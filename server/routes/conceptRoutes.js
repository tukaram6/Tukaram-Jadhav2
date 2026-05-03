const express = require("express");
const router = express.Router();
const {
  getConceptsByModule,
  createConcept,
} = require("../controllers/conceptController");

router.route("/").post(createConcept);
router.route("/:moduleId").get(getConceptsByModule);

module.exports = router;
