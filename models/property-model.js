const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema(
  { // document structure & rules definde here
    name: { type: String, required: true },
    propertyID: {
      type: Schema.Types.ObjectId,
      ref: "property",
      required: true
    },
   description: { type: String, required: true},
       // pictureUrl: { type: String, required: true, match: /^https?:\/\// }

   amenities: { 
    electricity: { type: Boolean, required: true },
    heating: { type: Boolean, required: true },
    water:{ type: Boolean, required: true },
    elevator:{ type: Boolean, required: true },
    garage:{ type: Boolean, required: true },
    kitchenAppliances: { type: Boolean, required: true },
    airConditioning:{ type: Boolean, required: true }
   },
   address: {
     street:{ type: String
      , required: true },
     city:{ type: String
      , required: true },
     state:{ type: String
      , required: true },
     zipcode:{ type: String
      , required: true },
     country:{ type: String
      , required: true }
   },
  {
    timestamps: true
  }
});

const Property = mongoose.model("property", propertySchema);

module.exports = Property;
