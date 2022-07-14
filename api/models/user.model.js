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
  phone: {
    type: String,
  },
  pages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Page",
    },
  ],
  roles: {
    type: String,
    enum: ["admin", "premium-user", "normal-user"],
    default: "normal-user",
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
