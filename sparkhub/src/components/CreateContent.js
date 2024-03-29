import React, { useState } from "react";
import { connect } from "react-redux";
import "../styles/CreateContent.css";
import formImage from "../assets/formImage.png";
import topLeftImage from "../assets/topLeftImage.png";


const CreateContent = ({ isAuthenticated, onContentCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState("text");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newContent = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      contentType,
      content,
      category,
    };

    onContentCreated(newContent);

    setTitle("");
    setDescription("");
    setContent("");
    setCategory("");

    setSuccessMessage("Content created successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const renderContentField = () => {
    switch (contentType) {
      case "text":
        return (
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          />
        );
      case "image":
        return (
          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleFileChange(event)}
            required
          />
        );
      case "video":
        return (
          <input
            type="file"
            accept="video/*"
            onChange={(event) => handleFileChange(event)}
            required
          />
        );
      case "link":
        return (
          <input
            type="text"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          />
        );
      default:
        return null;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setContent(event.target.result);
    };
    reader.readAsDataURL(file);
  };
    if (!isAuthenticated) {
      return <div>Please log in to create content.</div>;
    }

  return (
    <div className="create-content-container">
      <img src={topLeftImage} alt="Top Left" className="top-left-image" />
      <h2 className="create-content-header">Create Your Content Here</h2>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit} className="content-form">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <br />
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Tech">Tech</option>
          <option value="Fashion">Fashion</option>
          <option value="Art & Design">Art & Design</option>
          <option value="Health & Wellness">Health & Wellness</option>
          <option value="Food">Food</option>
        </select>
        <br />
        <label htmlFor="contentType">Content Type:</label>
        <select
          id="contentType"
          value={contentType}
          onChange={(event) => setContentType(event.target.value)}
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="link">Link</option>
        </select>
        <br />
        <label htmlFor="content">Content:</label>
        {renderContentField()}
        <br />
        <button type="submit">Create</button>
      </form>
      <img src={formImage} alt="Cute" className="cute-image" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(CreateContent);

