const { Schema, model } = require("mongoose");

const premiumSchema = new Schema({
  startOfSubscription: {
    type: Date,
    default: Date.now
  },
  endOfSubscription: {
    type: Date,
    required: true
  }
});

const Premium = model("Premium", premiumSchema);

module.exports = Premium;