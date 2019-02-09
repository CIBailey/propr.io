const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tenantSchema = new Schema(
  {
    // document structure & rules definde here
    name: { type: String, required: true },
    peropertyID: {
      type: Schema.Types.ObjectId,
      ref: "property",
      required: true
    },
    pictureUrl: { type: String, required: true, match: /^https?:\/\// }
  },
  {
    // additional settings for Schema class here
    timestamps: true
  }
);

const Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;
