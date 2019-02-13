const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tenantSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    contactName: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    propertyID: {
      type: Schema.Types.ObjectId,
      ref: "property",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;
