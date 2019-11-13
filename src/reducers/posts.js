import {
  GET_POSTS_SUCCESS,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_ERROR
} from "../actionTypes/posts";

const intialState = {
  all_posts: [],
  post: {},
  error: {}
};

export default function(state = intialState, action) {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        all_posts: action.payload
      };

    
     case GET_SINGLE_POST_SUCCESS:
       return {
         ...state,
         post: action.payload,
         error: {}
       }

      case GET_SINGLE_POST_ERROR:
        return{
          ...state,
          error: action.payload
        }

    default:
      return state;
  }
}

