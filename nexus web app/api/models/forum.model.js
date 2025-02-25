import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new Schema({
  username: { type: String, required: true },
  userImg:{ type: String, required: false },
  comment: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ForumPostSchema = new Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  userImg:{ type: String, required: false },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  comments: [CommentSchema]
});

export default mongoose.model("ForumPost", ForumPostSchema, "ForumPosts");
