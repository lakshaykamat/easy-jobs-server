require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
// const csrf = require("csurf");
// const passport = require('passport');
const cors = require("cors");
const winston = require("winston");
const path = require("path");
const Job = require("./models/Job");
const bodyParser = require("body-parser");
const indeedScraper = require("./scrapper/indeed-scrapper");
const linkedInScraper = require("./scrapper/linkedin-scrapper");

require("./config/mongo")(); // Connect to mongoDB

const app = express();

// Middleware setup
// app.use(helmet());
app.use(
  cors({
    origin: ["http://127.0.0.1:3001", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(bodyParser.json());
// app.use(passport.initialize());

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Serve static files (optional)
app.use(express.static(path.join(__dirname, "public")));

// Example route
app.get("/", async (req, res) => {
  const jobs = await Job.find({});
  const indeedJobs = await Job.find({ source: "Indeed" });
  const linkedInJobs = await Job.find({ source: "LinkedIn" });
  res.render("index", {
    title: "My Job Portal",
    jobsLength: jobs.length,
    indeedJobs,
    linkedInJobs,
  });
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.MAX_RATE_LIMIT_REQUEST, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// app.use(csrf());

// Logger setup
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Routes setup
app.use("/api/v1/jobs", require("./routes/jobs"));

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
