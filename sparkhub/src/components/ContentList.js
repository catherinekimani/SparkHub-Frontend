import React, {useState} from "react";
import "../styles/ContentList.css";
import { connect } from "react-redux";
import { updateContent } from "../actions/contentActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faThumbsUp,
  faShare,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const ContentList = ({
  content,
  onDelete,
  onLike,
  onShare,
  isAuthenticated,
  likedContentIds,
  updateContent,
}) => {
  const location = useLocation();
  const exploreRoute = location.pathname === "/explore";
  const [userLikedContentIds, setUserLikedContentIds] = useState([]);

  const handleLikeClick = (id) => {
    if (!userLikedContentIds.includes(id)) {
      onLike(id);
      setUserLikedContentIds([...userLikedContentIds, id]);
    }
  };
  const [editingContentId, setEditingContentId] = useState(null);
  const [editedContent, setEditedContent] = useState({});

  const handleEdit = (id) => {
    setEditingContentId(id);
    const contentToEdit = content.find((item) => item.id === id);
    if (contentToEdit) {
      setEditedContent(contentToEdit);
    }
  };

const handleSaveEdit = () => {
  const index = content.findIndex((item) => item.id === editingContentId);
  if (index !== -1) {
    const updatedContent = [...content];
    updatedContent[index] = {
      ...updatedContent[index],
      title: editedContent.title,
      description: editedContent.description,
    };

    updateContent(updatedContent);
    setEditingContentId(null);
    setEditedContent({});
  }
};


  const handleCancelEdit = () => {
    setEditingContentId(null);
    setEditedContent({});
  };

  let filteredContent = content;
  if (!exploreRoute) {
    const category = location.pathname.split("/")[2];
    filteredContent = content.filter((item) => {
      return item.category.toLowerCase() === category.toLowerCase();
    });
  }

  return (
    <div className="content-list">
      {filteredContent.map((item) => (
        <div className="content-card" key={item.id}>
          {item.contentType === "image" && (
            <img
              src={item.content}
              alt={item.title}
              className="content-image"
            />
          )}
          <div className="content-details">
            <p className="category">{item.category}</p>
            {item.contentType !== "image" && <h3>{item.title}</h3>}
            <p>{item.description}</p>
            {renderContentBasedOnType(item)}
            <div className="button-container">
              {!editingContentId && isAuthenticated && (
                <>
                  <button
                    className="action-button"
                    onClick={() => onDelete(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    className="action-button"
                    onClick={() => handleLikeClick(item.id)}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} />
                    {item.likes}
                  </button>
                </>
              )}
              {isAuthenticated && (
                <>
                  {editingContentId === item.id ? (
                    <>
                      <input
                        type="text"
                        value={editedContent.title}
                        onChange={(e) =>
                          setEditedContent({
                            ...editedContent,
                            title: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={editedContent.description}
                        onChange={(e) =>
                          setEditedContent({
                            ...editedContent,
                            description: e.target.value,
                          })
                        }
                      />
                      <button
                        className="action-button"
                        onClick={handleSaveEdit}
                      >
                        Save
                      </button>
                      <button
                        className="action-button"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="action-button"
                      onClick={() => handleEdit(item.id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  )}
                </>
              )}
              <button
                className="action-button"
                onClick={() => onShare(item.id)}
              >
                <FontAwesomeIcon icon={faShare} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const renderContentBasedOnType = (item) => {
  switch (item.contentType) {
    case "text":
      return <p>{item.content}</p>;
    case "video":
      return <video controls src={item.content} />;
    case "link":
      return <a href={item.content}>{item.content}</a>;
    default:
      return null;
  }
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  // content: state.content
});


const mapDispatchToProps = {
  updateContent 
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentList);