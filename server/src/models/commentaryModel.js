import mongoose from "mongoose";

const commentarySchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    avatar: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    commentary: {
      type: String,
      maxLength: 150,
      required: true,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const commentaryModel = mongoose.model("commentarys", commentarySchema);

export default commentaryModel;
