const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    // document structure & rules definde here
    name: { type: String, required: true },
    description: { type: String, required: true },
    rentAmount: { type: String, required: true },
    featurePhoto: { type: String, required: true },
    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    interiorSize: { type: Number, required: true },
    parking: { type: String, required: true },
    deposit: { type: Number, required: true },

    amenities: {
      type: Array
    },

    address: {
      street1: { type: String, required: true },
      street2: { type: String },
      city: { type: String, required: true },
      zipcode: { type: String, required: true },
      country: { type: String, required: true }
    }
  },

  {
    timestamps: true
  }
);

const Property = mongoose.model("property", propertySchema);

module.exports = Property;
