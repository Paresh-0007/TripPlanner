import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String, // cloudinary url - where actual images are uploaded
      required: true,
    },
    blogHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//async-await is used to make function to wait for a line as that line of code may require more time for execution

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next(); //WE KNOW PASSWORD CAN ONLY BE MODIFIED BY BCRYPT SO WHEN PASSWORD IS ALREADY MODIFIED(ENCRYPTED) SO THIS LINE PREVENT PASSWORD FROM ENCRYPTING AGAIN.
  }
  this.password = await bcrypt.hash(this.password, 10); // hash(plainTexr, no.s of Round for Encryption)
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
  // .methods is use to inject additional method for further usage related to Schema models
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  // This will be used for session and cookies for users
  return jwt.sign(
    // for creating tokens we will use jwt, provides .sign(
    {
      //                                                      {payloaddata(userdata for generating token)},
      _id: this._id, //                                                      SecretKey(secret key for encryption),
      email: this.email, //                                                      {expiresIn:}
      username: this.username, //                                                      )
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
UserSchema.methods.generateRefreshToken = function () {
  // This will be used for session and cookies for users
  return jwt.sign(
    // for creating tokens we will use jwt, provides .sign(
    {
      //                                                      {payloaddata(userdata for generating token)},
      _id: this._id, //                                                      SecretKey(secret key for encryption),
    }, //                                                      {expiresIn:}
    process.env.REFRESH_TOKEN_SECRET, //                                                      )
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", UserSchema);
