import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./hocs/Layout";

import HomePage from "./containers/HomePage";
import LoginForm from "./containers/LoginForm";
import UserRegistrationForm from "./containers/UserRegistrationForm";
import Activate from "./containers/Activate";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";

import ContentList from "./components/ContentList";
import CreateContent from "./components/CreateContent";

import { Provider } from "react-redux";
import store from "./store";

const App = () => {

  const [content, setContent] = useState([]);

  useEffect(() => {
    const storedContent = localStorage.getItem("content");
    if (storedContent) {
      setContent(JSON.parse(storedContent));
    }
  }, []);
  const addNewContent = (newContent) => {
    const updatedContent = [...content, { ...newContent, likes: 0 }];
    setContent(updatedContent);
    localStorage.setItem("content", JSON.stringify(updatedContent));
  };
  const deleteContent = (id) => {
    const updatedContent = content.filter((item) => item.id !== id);
    setContent(updatedContent);
    localStorage.setItem("content", JSON.stringify(updatedContent));
  };

  const handleLike = (id) => {
    const updatedContent = content.map((item) => {
      if (item.id === id) {
        return { ...item, likes: item.likes + 1 };
      }
      return item;
    });
    setContent(updatedContent);
    localStorage.setItem("content", JSON.stringify(updatedContent));
  };

  const handleShare = (id) => {
    console.log(`Shared content with id ${id}`);
  };
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/register" component={UserRegistrationForm} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route
              exact
              path="/password/reset/confirm/:uid/:token"
              component={ResetPasswordConfirm}
            />
            <Route exact path="/activate/:uid/:token/" component={Activate} />
            <Route exact path="/create">
              <CreateContent onContentCreated={addNewContent} />
            </Route>
            <Route
              exact
              path="/explore"
              render={() => (
                <ContentList
                  content={content}
                  onDelete={deleteContent}
                  onLike={handleLike}
                  onShare={handleShare}
                />
              )}
            />
            <Route
              exact
              path="/explore/:categoryName"
              render={(props) => (
                <ContentList
                  content={content.filter(
                    (item) => item.category === props.match.params.categoryName
                  )}
                  onDelete={deleteContent}
                  onLike={handleLike}
                  onShare={handleShare}
                />
              )}
            />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
};
export default App;
