import React, { useState, useEffect } from "react";
import { FaUserCircle, FaCommentDots, FaHeart, FaPlus, FaSearch, FaFilter, FaChevronLeft } from "react-icons/fa";
import newRequest from "../../utils/newRequest";
import "./Forum.scss";

function Forum() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user from localStorage
    try {
      const userFromStorage = JSON.parse(localStorage.getItem("currentUser"));
      setCurrentUser(userFromStorage);
    } catch (err) {
      console.error("Error getting user from localStorage:", err);
    }

    const fetchPosts = async () => {
      try {
        const res = await newRequest.get("/forum");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  const fetchPostDetails = async (postId) => {
    try {
      const res = await newRequest.get(`/forum/${postId}`);
      setSelectedPost(res.data);
      setComments(res.data.comments || []);
    } catch (err) {
      console.error("Error fetching post details:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    
    // Create a new comment object with userImg
    const newCommentObj = {
      username: currentUser?.username || "You",
      userImg: currentUser?.img || null,  // Include userImg
      comment: newComment,
      timestamp: new Date().toISOString()
    };
    
    // Update UI immediately (Optimistic UI update)
    setComments([...comments, newCommentObj]);
    setNewComment("");
    
    // Send data to the backend
    try {
      await newRequest.post(`/forum/${selectedPost._id}/comment`, {
        username: currentUser?.username || "You",
        userImg: currentUser?.img || null,  // Send userImg to DB
        comment: newComment,
      });
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };
  

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPostTitle.trim() === "" || newPostContent.trim() === "") return;
    
    // Create post object with explicit userImg field
    const postData = {
      username: currentUser?.username || "You",
      userImg: currentUser?.img || null,  
      title: newPostTitle,
      content: newPostContent,
    };
    
    try {
      console.log("Sending post data:", postData); 
      const res = await newRequest.post("/forum", postData);
      
      
      const newPost = {
        ...res.data,
        userImg: currentUser?.img || null 
      };
      
      setPosts([newPost, ...posts]);
      setNewPostTitle("");
      setNewPostContent("");
      setShowCreatePost(false);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const getUserAvatar = (userImg) => {
    if (userImg) {
      return <img src={userImg} alt="User" className="user-avatar" />;
    }
    return <FaUserCircle className="user-avatar" />;
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="forum-container">
      <div className="forum-header">
        <h1>Community Forum</h1>
        <div className="forum-actions">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="create-discussion-btn"
            onClick={() => setShowCreatePost(!showCreatePost)}
          >
            <FaPlus /> New Discussion
          </button>
        </div>
      </div>

      <div className="forum-content">
        {showCreatePost && (
          <div className="create-post-panel">
            <div className="panel-header">
              <h2>Start a New Discussion</h2>
              <button className="close-btn" onClick={() => setShowCreatePost(false)}>×</button>
            </div>
            <form onSubmit={handlePostSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="What's your discussion about?"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  placeholder="Share your thoughts or questions with the community..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={6}
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowCreatePost(false)}>Cancel</button>
                <button type="submit" className="submit-btn">Publish Discussion</button>
              </div>
            </form>
          </div>
        )}

        <div className={`forum-layout ${selectedPost ? 'with-details' : ''}`}>
          <div className="posts-list">
            <div className="list-header">
              <h2>Discussions</h2>
              <div className="filter-options">
                <FaFilter />
                <select defaultValue="recent">
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="commented">Most Commented</option>
                </select>
              </div>
            </div>
            
            {filteredPosts.length === 0 ? (
              <div className="no-posts">
                <p>No discussions found. Be the first to start a conversation!</p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div 
                  key={post._id} 
                  className={`post-card ${selectedPost && selectedPost._id === post._id ? 'active' : ''}`}
                  onClick={() => fetchPostDetails(post._id)}
                >
                  <div className="post-header">
                    <div className="user-info">
                      {post.userImg ? (
                        <img src={post.userImg} alt="User" className="user-icon" />
                      ) : (
                        <FaUserCircle className="user-icon" />
                      )}
                      <span className="username">{post.username}</span>
                    </div>
                    <span className="timestamp">{new Date(post.timestamp).toLocaleString()}</span>
                  </div>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-preview">
                    {post.content && post.content.substring(0, 100)}
                    {post.content && post.content.length > 100 ? "..." : ""}
                  </p>
                  <div className="post-metrics">
                    <div className="metric">
                      <FaHeart className="icon" />
                      <span>{post.likes || 0}</span>
                    </div>
                    <div className="metric">
                      <FaCommentDots className="icon" />
                      <span>{post.commentCount || 0}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {selectedPost && (
            <div className="post-details-panel">
              <div className="panel-header">
                <button 
                  className="back-btn"
                  onClick={() => setSelectedPost(null)}
                >
                  <FaChevronLeft /> Back to Discussions
                </button>
              </div>
              
              <div className="selected-post">
                <div className="post-header">
                  <div className="author-info">
                    {selectedPost.userImg ? (
                      <img src={selectedPost.userImg} alt="User" className="user-avatar" />
                    ) : (
                      <FaUserCircle className="user-avatar" />
                    )}
                    <div>
                      <h3 className="author-name">{selectedPost.username}</h3>
                      <p className="post-date">{new Date(selectedPost.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <h2 className="post-title">{selectedPost.title}</h2>
                <div className="post-content">{selectedPost.content}</div>
                
                <div className="post-actions">
                  <button className="action-btn">
                    <FaHeart /> Like ({selectedPost.likes || 0})
                  </button>
                  <button className="action-btn">
                    <FaCommentDots /> Comments ({comments.length})
                  </button>
                </div>
              </div>

              <div className="comments-section">
                <h3>Discussion ({comments.length})</h3>
                
                {comments.length === 0 ? (
                  <p className="no-comments">No comments yet. Be the first to join the discussion!</p>
                ) : (
                  <div className="comments-list">
                    {comments.map((comment, index) => (
                      <div key={index} className="comment">
                        <div className="comment-author">
                          {comment.userImg ? (
                            <img src={comment.userImg} alt="User" className="user-avatar" />
                          ) : (
                            <FaUserCircle className="user-avatar" />
                          )}
                          <div>
                            <h4>{comment.username}</h4>
                            <p className="comment-time">
                              {comment.timestamp ? new Date(comment.timestamp).toLocaleString() : "Just now"}
                            </p>
                          </div>
                        </div>
                        <p className="comment-text">{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                )}

                <form onSubmit={handleCommentSubmit} className="comment-form">
                  <div className="form-input">
                    {currentUser?.img ? (
                      <img src={currentUser.img} alt="User" className="user-avatar" />
                    ) : (
                      <FaUserCircle className="user-avatar" />
                    )}
                    <input
                      type="text"
                      placeholder="Share your thoughts..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="submit-btn">Post Comment</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Forum;