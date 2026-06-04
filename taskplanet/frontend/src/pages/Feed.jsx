import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Box,
  Divider,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

import API from "../services/api";
import "../App.css";

function Feed() {
  if (!localStorage.getItem("token")) {
    window.location.href = "/";
  }

  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [comments, setComments] = useState({});

  const username = localStorage.getItem("username");

  const loadPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async () => {
    if (!text.trim()) return;

    try {
      await API.post("/posts/create", {
        username,
        text,
      });

      setText("");
      loadPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async (id) => {
    try {
      await API.put(`/posts/${id}/like`, {
        username,
      });

      loadPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (id) => {
    if (!comments[id]) return;

    try {
      await API.post(`/posts/${id}/comment`, {
        username,
        comment: comments[id],
      });

      setComments({
        ...comments,
        [id]: "",
      });

      loadPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="logo">🚀 TaskPlanet</div>

        <Typography>
          Welcome, {username}
        </Typography>

        <Button
          variant="contained"
          color="error"
          onClick={logout}
        >
          Logout
        </Button>
      </div>

      <div className="feed-wrapper">
        <Container maxWidth="md">
          {/* Create Post */}
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 3,
              mb: 4,
              background: "#161b22",
              color: "white",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Create Post
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              sx={{
                input: { color: "white" },
                textarea: { color: "white" },
              }}
            />

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={createPost}
            >
              Post
            </Button>
          </Paper>

          {/* Feed Posts */}
          {posts.map((post) => (
            <Paper
              key={post._id}
              className="post-card"
            >
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                mb={2}
              >
                <Avatar>
                  {post.username?.charAt(0)}
                </Avatar>

                <Typography variant="h6">
                  {post.username}
                </Typography>
              </Box>

              <Typography sx={{ mb: 2 }}>
                {post.text}
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box display="flex" gap={2}>
                <Button
                  startIcon={<FavoriteIcon />}
                  onClick={() =>
                    likePost(post._id)
                  }
                >
                  {post.likes.length}
                </Button>

                <Button
                  startIcon={<CommentIcon />}
                >
                  {post.comments.length}
                </Button>
              </Box>

              <Box mt={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Write a comment..."
                  value={
                    comments[post._id] || ""
                  }
                  onChange={(e) =>
                    setComments({
                      ...comments,
                      [post._id]:
                        e.target.value,
                    })
                  }
                />

                <Button
                  variant="outlined"
                  sx={{ mt: 1 }}
                  onClick={() =>
                    addComment(post._id)
                  }
                >
                  Add Comment
                </Button>
              </Box>

              <Box mt={2}>
                {post.comments.map(
                  (comment, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 1,
                        mt: 1,
                        backgroundColor:
                          "#21262d",
                        color: "white",
                      }}
                    >
                      <strong>
                        {comment.username}
                      </strong>

                      <Typography>
                        {comment.comment}
                      </Typography>
                    </Paper>
                  )
                )}
              </Box>
            </Paper>
          ))}
        </Container>
      </div>
    </>
  );
}

export default Feed;