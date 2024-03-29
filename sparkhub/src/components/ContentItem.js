import React, { useState } from "react";
import { likeContent } from "../services/api";

const ContentItem = ({ content, isLiked, onLikeToggle }) => {
  const [isLiking, setIsLiking] = useState(false);

  const handleLikeClick = async () => {
    setIsLiking(true);
    try {
      const response = await likeContent(content.id, isLiked);
      console.log("Like response:", response);
      onLikeToggle(!isLiked);
    } catch (error) {
      console.error("Error liking content:", error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div>
      <button onClick={handleLikeClick} disabled={isLiking}>
        {isLiked ? "Unlike" : isLiking ? "Liking..." : "Like"}
      </button>
    </div>
  );
};

export default ContentItem;
