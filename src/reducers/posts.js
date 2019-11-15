import {
  GET_POSTS_SUCCESS,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_ERROR,
  POST_LOADING
} from "../actionTypes/posts";

const intialState = {
  all_posts: {},
  post: {},
  error: {},
  isLoading: true
};

export default function(state = intialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        isLoading: true,
        all_posts: {},
        post:{}
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        all_posts: action.payload,
        isLoading: false
      };

    case GET_SINGLE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        isLoading: false,
        error: {}
      };

    case GET_SINGLE_POST_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    default:
      return state;
  }
}
