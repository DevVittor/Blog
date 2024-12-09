import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    photos: {
      type: [String],
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      minLenght: 30,
      maxLenght: 150,
      required: true,
    },
    content: {
      type: String,
      minLenght: 150,
      maxLenght: 500,
      required: true,
    },
    categories: {
      type: [String],
      enum: ["tecnologia", "economia", "esporte", "novela", "jogos"],
    },
    commentaryId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "commentarys",
      },
    ],
    edit: {
      type: Boolean,
      default: false,
    },
    likesUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    reason: {
      type: String,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("posts", postSchema);

export default postModel;
