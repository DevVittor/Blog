import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
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
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      default: "Todos",
    },
    skills: {
      type: [String],
      required: true,
    },
    price: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },
    contact: {
      type: String,
      required: true,
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
