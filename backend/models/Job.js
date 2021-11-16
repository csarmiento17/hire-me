const { Schema, model } = require("mongoose");

const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  jobTypes: {
    type: [String],
    required: true,
  },

  coordinates: {
    type: [String],
  },
});

const Job = model("Job", JobSchema);

module.exports = Job;
