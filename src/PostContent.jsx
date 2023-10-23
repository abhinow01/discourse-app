import React, { useState, useEffect } from "react";
import { TextField, Button, Modal, Box, Typography } from "@mui/material";
import axios from "axios";

function PostContent() {
  const [content, setContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [postedContent, setPostedContent] = useState([]);

  useEffect(() => {
    // Fetch posted content when component mounts
    axios.get('http://localhost:3000/getPostedContent')
      .then(response => {
        setPostedContent(response.data);
      })
      .catch(error => {
        console.error('Error fetching posted content:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once on mount

  const handlePost = () => {
    // Implement the logic to send the content to the backend
    console.log("Posted:", content);
    setModalOpen(false); // Close the modal after posting

    // Optionally, you can also update the posted content list here if needed
    setPostedContent(prevContent => [...prevContent, { text: content }]);
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <TextField
        label="Post Content"
        multiline
        fullWidth
        rows={4}
        variant="outlined"
        onClick={() => setModalOpen(true)} // Open the modal on click
        value={content}
        disabled // Make the TextField read-only
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Post Content
          </Typography>
          <TextField
            label="Write your content"
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 10 }}
            onClick={handlePost}
          >
            Post
          </Button>
        </Box>
      </Modal>

      <div>
        <h2>Posted Content</h2>
        <ul>
          {postedContent.map((item, index) => (
            <li key={index}>{item.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostContent;
