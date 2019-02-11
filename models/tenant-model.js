const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tenantSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    peropertyID: {
      type: Schema.Types.ObjectId,
      ref: "property",
      required: true
    }
    // phone: { type: String, required: true },
    // pictureUrl: { type: String, required: true, match: /^https?:\/\// }
  },
  {
    timestamps: true
  }
);

const Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;
