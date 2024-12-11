import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    postId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "author"],
      default: "user",
    },
    limit: {
      type: Number,
      default: 5,
    },
    commentaryId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "commentarys",
      },
    ],
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
