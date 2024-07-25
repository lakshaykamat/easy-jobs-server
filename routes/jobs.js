const express = require("express");
const router = express.Router();
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controller/jobs");
const { validateJob } = require("../validators/jobs");

router.get("/", getJobs);
router.post("/", validateJob, createJob);
router.get("/:id", getJobById);
router.put("/:id", validateJob, updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
