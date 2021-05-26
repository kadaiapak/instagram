import { getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData";
import { cloudUpload } from "../../utils/imageUpload";
import { GLOBALTYPES } from "./globalTypes";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  LOADING_POST: "LOADING_POST",
  GET_POSTS: "GET_POSTS",
  UPDATE_POST: "UPDATE_POST",
};

export const createPost =
  ({ content, images, auth }) =>
  async (dispatch) => {
    let media = [];
    try {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: true },
      });
      if (images.length > 0) {
        media = await cloudUpload(images);
      }
      const res = await postDataAPI(
        "posts",
        { content, images: media },
        auth.token
      );

      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...res.data.newPost, user: auth.user }, //hanya newPost karena kita tidak butuh semua res.data ataupun message nya
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: false },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({
      type: POST_TYPES.LOADING_POST,
      payload: true,
    });
    const res = await getDataAPI("posts", token);

    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: res.data,
    });
    dispatch({
      type: POST_TYPES.LOADING_POST,
      payload: false,
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const updatePost =
  ({ content, images, auth, status }) =>
  async (dispatch) => {
    let media = [];
    const newUrl = images.filter((img) => !img.url);
    const oldUrl = images.filter((img) => img.url);
    if (
      newUrl.length === 0 &&
      status.content === content &&
      oldUrl.length === status.images.length
    )
      return;
    try {
      dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
      if (newUrl.length > 0) {
        media = await cloudUpload(newUrl);
      }
      const res = await patchDataAPI(
        `post/${status._id}`,
        {
          content,
          images: [...oldUrl, ...media],
        },
        auth.token
      );
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost });
      dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const likePost =
  ({ post, auth }) =>
  async (dispatch) => {
    // menambah auth.user kedalam like post
    const newPost = { ...post, likes: [...post.likes, auth.user] };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
      patchDataAPI(`post/${post._id}/like`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const dislikePost =
  ({ post, auth }) =>
  async (dispatch) => {
    // menghapus auth.user dari post.likes
    const newPost = {
      ...post,
      likes: post.likes.filter((x) => x._id !== auth.user._id),
    };
    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });
    try {
      // jangan salah masukkan api, kalau tanpa /dislike maka yang terupdate semua data post bukan cuman like nya saja
      // semua data post menjadi null

      await patchDataAPI(`post/${post._id}/dislike`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
