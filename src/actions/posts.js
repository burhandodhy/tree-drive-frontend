import axios from "axios";
import {
  GET_POSTS_SUCCESS,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_ERROR,
  POST_LOADING
} from "../actionTypes/posts";

import { createMessage, createError } from "../actions/messages";
import { API_URL } from "../config";

export const getPosts = pageNo => dispatch => {
  // Header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let url = `${API_URL}post/`;
  if (pageNo) {
    url += `?page=${pageNo}`;
  }

  dispatch({ type: POST_LOADING });
  axios.get(url, "", config).then(response => {
    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: response.data
    });
  });
};

export const getSinglePost = id => dispatch => {
  // Header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  dispatch({ type: POST_LOADING }); 
  axios
    .get(`${API_URL}post/${id}`, "", config)
    .then(response => {
      dispatch({
        type: GET_SINGLE_POST_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_SINGLE_POST_ERROR,
        payload: error.response.data
      });
    });
};

export const likePost = id => dispatch => {
  // Header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios
    .get(`${API_URL}post/${id}/up-vote`, "", config)
    .then(response => {
      dispatch(createMessage({ success: "Up Voted!" }));
    })
    .catch(error => {
      dispatch(createError(error.response.data, error.response.status));
    });
};

export const dislikePost = id => dispatch => {
  // Header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios
    .get(`${API_URL}post/${id}/down-vote`, "", config)
    .then(response => {
      dispatch(createMessage({ success: "Down Voted!" }));
    })
    .catch(error => {
      dispatch(createError(error.response.data, error.response.status));
    });
};
