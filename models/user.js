const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const user = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 8,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    dob: {
      type: Date,
      optional: true,
    },
  },
  { timestamps: true }
);
// hashing pass before insert it inside data
user.pre("save", async function (next) {
  var salt = await bcrypt.genSalt(10);
  let hashedPass = await bcrypt.hash(this.password, salt);
  this.password = hashedPass;
  next();
});

module.exports = mongoose.model("user", user);
