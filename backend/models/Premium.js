const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');
const endOfSubs = require('../utils/endOfSubs');

const premiumSchema = new Schema(
  {
    startOfSubscription: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    lengthOfSubscription: {
      type: Number,
      required: true
    }
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
);

premiumSchema.virtual('endOfSubscription')
  .get(function() { 
    return dateFormat(endOfSubs(this.lengthOfSubscription)); 
  });

const Premium = model("Premium", premiumSchema);

module.exports = Premium;