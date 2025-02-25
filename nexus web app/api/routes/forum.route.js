import express from "express";
import { getForumPosts, getForumPostById, createForumPost, addComment } from "../controllers/forum.controller.js";

const router = express.Router();

router.get("/", getForumPosts); // Get all posts
router.get("/:id", getForumPostById); // Get single post
router.post("/", createForumPost); // Create a post
router.post("/:id/comment", addComment); // Add a comment to a post

export default router;
