const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
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
    type: String,
    required: true,
  },
  coordinates: {
    type: [String],
  },
  //users who saved this job to their profile
  savedUsers: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  //users who applied this job
  appliedUsers: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
});

jobSchema.virtual('savedUsersCount').get(function () {
  return this.savedUsers.length;
});
jobSchema.virtual('appliedUsersCount').get(function () {
  return this.appliedUsers.length;
});

const Job = model("Job", jobSchema);

module.exports = Job;
