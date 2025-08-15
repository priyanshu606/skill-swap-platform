const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: { type: String },
    profilePhoto: { type: String }, // optional - URL or path
    skillsOffered: [String],
    skillsWanted: [String],
    availability: { type: String }, // e.g., "Evenings", "Weekends"
    isPublic: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const signUpUser = mongoose.model("User", userSchema);

module.exports = signUpUser;
