const express = require("express");
const router = express.Router();
const {
  getModules,
  getModuleById,
  createModule,
} = require("../controllers/moduleController");

router.route("/").get(getModules).post(createModule);
router.route("/:id").get(getModuleById);

module.exports = router;
