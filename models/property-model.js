const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    // document structure & rules definde here
    name: { type: String, required: true },
    propertyID: {
      type: Schema.Types.ObjectId,
      ref: "property",
      required: true
    },

    description: { type: String, required: true },
    rentAmount: { type: Number, required: true },
    featurePhoto: { type: String, required: true },

    amenities: {
      type: Array
    },

    address: {
      street: { type: String, required: true },
      street2: { type: String, required: true },
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
