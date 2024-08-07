const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const validator = require("validator");
dotenv.config({ path: ".././src/config/config.env" });
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  profilePic: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    //validation will be before saving to db
  },
  role: {
    type: String,
    enum: ["worker", "admin", "client"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // emailVerified: {
  //   type: Boolean,
  //   default: false,
  // },
  // emailVerificationToken: {
  //   type: Number,
  // },
  // emailVerificationTokenExpires: {
  //   type: Date,
  // },
  passwordResetToken: {
    type: Number,
  },
  passwordResetTokenExpires: {
    type: Date,
  },
  // lastLogin: {
  //   type: Date,
  // },
  isActive: {
    type: Boolean,
    default: true,
  },
  address: {
    type: String,
  },
  address2: {
    type: String,
  },
  profession: {
    type: String,
  },
  idNumber: {
    type: String,
  },
  certificate: {
    type: String,
  },
  skills: {
    type: String,
  },
  experience: {
    type: String,
  },
  qualification: {
    type: String,
  },
  idDocs: {
    type: [String],
  },
  adminApproval: {
    type: String,
    // default: "pending",
  },
  deviceToken: {
    type: String,
  },
  aboutMe: {
    type: String,
  },
  phone: {
    type: String,
    // required: true,
  },
  withdrawal: {
    type: Boolean,
    default: false,
  },
});

//hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//jwtToken
userSchema.methods.getJWTToken = function () {
  console.log("JWT_SECRET", this._id, process.env.JWT_SECRET);
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const user = mongoose.model("user", userSchema);

module.exports = user;
