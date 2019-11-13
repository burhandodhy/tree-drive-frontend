import React from "react";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { HashRouter as Router, Route } from "react-router-dom";

import Alerts from "./layout/Alerts";

import store from "../store";
import { loadUser } from "../actions/auth";
import PrivateRoute from "./common/PrivateRoute";

import Header from "./layout/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import SinglePost from "./pages/SinglePost"

const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Alerts />
          <Router>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/Register" component={Register} />
            <Route path="/blog" exact component={Posts} />
            <Route path="/blog/:id" component={SinglePost} />
            <PrivateRoute path="/profile" component={Profile} />
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
