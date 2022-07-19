const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, "Field first name is not provided."],
  },
  lastName: {
    type: String,
    required: [true, "Field last name is not provided"],
  },
  facebookId: {
    type: String,
    required: [true, "Field facebook id is not provided"],
  },
  pages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Page",
    },
  ],
  roles: {
    type: String,
    enum: ["ADMIN", "PREMIUM_USER", "NORMAL_USER"],
    default: "NORMAL_USER",
  },
});

userSchema.static(
  "findOneOrCreate",
  async function findOneOrCreate(condition, doc) {
    const found = await this.findOne(condition);
    return found || this.create(doc);
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
