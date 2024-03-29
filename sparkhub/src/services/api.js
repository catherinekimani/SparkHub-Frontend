import axios from "axios";
import {checkAuthenticated} from '../actions/auth'
const baseURL = "http://localhost:8000";

const getCsrfToken = () => {
  const cookieValue = document.cookie.match(/csrftoken=([^;]+)/);
  return cookieValue ? cookieValue[1] : null;
};

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

axios.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});
const fetchContent = async (endpoint = "") => {
  try {
    const baseURL = "http://localhost:8000";
    const response = await axios.get(`${baseURL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
};
const fetchComments = async (contentId) => {
  try {
    const response = await axios.get(`${baseURL}${contentId}/comments/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

const likeContent = async (contentId, isLiked) => {
  try {
    const url = `${baseURL}${contentId}/like/`;
    const method = isLiked ? "DELETE" : "POST";

    const response = await axios({
      method,
      url,
      headers: {
        Authorization: `Token ${localStorage.getItem("access_token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error liking content:", error);
    throw error;
  }
};

const createContent = async (endpoint, data) => {
  try {
    const isAuthenticated = await checkAuthenticated();
    if (!isAuthenticated) {
      return;
    }

    const csrfToken = getCsrfToken();

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${endpoint}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating content:", error);
    throw error;
  }
};


export { fetchContent, fetchComments, likeContent, createContent };
