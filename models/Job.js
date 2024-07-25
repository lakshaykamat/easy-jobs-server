const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const JobSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from both ends of a string
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: String,
      default: "Not Disclosed",
      trim: true,
    },
    datePosted: {
      type: Date,
      default: Date.now,
    },
    applyLink: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    /*
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Temporary", "Internship", "Other"], // Enum for predefined job types
      default: "Full-Time",
      trim: true,
    },
    experienceLevel: {
      type: String,
      enum: ["Entry Level", "Mid Level", "Senior Level", "Executive", "Internship"], // Enum for predefined experience levels
      default: "Entry Level",
      trim: true,
    },
    */
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Indexes for frequently queried fields
JobSchema.index({ title: 1 });
JobSchema.index({ company: 1 });
JobSchema.index({ location: 1 });
JobSchema.index({ datePosted: -1 }); // Index datePosted in descending order

JobSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Job", JobSchema);
