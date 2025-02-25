import ForumPost from "../models/forum.model.js";

// Get all forum posts
export const getForumPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find().sort({ timestamp: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a single forum post by ID
export const getForumPostById = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new forum post
export const createForumPost = async (req, res) => {
  try {
    const { username, userImg, title, content } = req.body;
    const newPost = new ForumPost({ username, userImg, title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

// Add a comment to a post
export const addComment = async (req, res) => {
  try {
    const { username,userImg,  comment } = req.body;
    const post = await ForumPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ username,userImg, comment });
    await post.save();

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};
