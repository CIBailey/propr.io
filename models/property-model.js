const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    rentAmount: { type: String, required: true },
    featurePhoto: { type: String, required: true },
    bedroom: { type: String, required: true },
    bathroom: { type: String, required: true },
    interiorSize: { type: String },
    parking: { type: String, required: true },
    deposit: { type: String, required: true },

    amenities: {
      type: Array
    },

    address: {
      street1: { type: String, required: true },
      street2: { type: String },
      city: { type: String, required: true },
      zipcode: { type: String, required: true },
      country: { type: String, required: true }
    },
    userId: {type: Schema.Types.ObjectId,
      ref: "User",
      required: true}
  },

  {
    timestamps: true
  }
);

const Property = mongoose.model("property", propertySchema);

module.exports = Property;
