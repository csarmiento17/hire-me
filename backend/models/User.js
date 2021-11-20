const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Job = require("./Job");
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
<<<<<<< HEAD
    savedJobs: [Job.schema],
    appliedJobs: [Job.schema]
=======
    savedJobs: [{
      type: Schema.Types.ObjectId,
      ref: "Job"
    }],
    appliedJobs: [{
      type: Schema.Types.ObjectId,
      ref: "Job"
    }],
    lengthOfSubscription: {
      type: Number
    },
    premium: {
      type: Schema.Types.ObjectId,
      ref: "Premium"
    }
>>>>>>> develop
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('savedJobsCount').get(function () {
  return this.savedJobs.length;
});

userSchema.virtual('appliedJobsCount').get(function () {
  return this.appliedJobs.length;
});

const User = model("User", userSchema);

module.exports = User;
