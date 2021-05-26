const { POST_TYPES } = require("../actions/postAction");

const initialState = {
  loading: false,
  posts: [],
  result: 0,
  page: 2,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case POST_TYPES.LOADING_POST:
      return {
        ...state,
        loading: action.payload,
      };
    case POST_TYPES.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
      };

    case POST_TYPES.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((x) =>
          x._id === action.payload._id ? action.payload : x
        ),
      };
    default:
      return state;
  }
};

export default postReducer;
