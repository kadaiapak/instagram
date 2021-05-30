import { patchDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import { POST_TYPES } from "./postAction";

export const createComment =
  ({ post, newComment, auth }) =>
  async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] };
    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });
    console.log({ newPost });
    try {
      const data = { ...newComment, postId: post._id };
      const res = await patchDataAPI("comment", data, auth.token);
      console.log(res);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
