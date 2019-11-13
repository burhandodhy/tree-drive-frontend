import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { userLogin } from "../../actions/auth";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    login: PropTypes.object,
    isAuthenticated: PropTypes.bool
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    this.props.userLogin(this.state.username, this.state.password);
  };

  render() {

    const { isLoading, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    const loader = isLoading ? (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      ""
    );

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter Username"
              value={this.state.username}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <div>{this.state.error_message}</div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            Submit
          </button>
          {loader}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});
export default connect(mapStateToProps, { userLogin })(Login);
