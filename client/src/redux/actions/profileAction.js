import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { cloudUpload } from "../../utils/imageUpload";

export const PROFILETYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
  FOLLOW: "FOLLOW",
};

export const getProfileUsers = ({ users, id, auth }) => async (dispatch) => {
  // jika user belum ada dalam array of users maka panggil
  if (users.every((user) => user._id !== id)) {
    try {
      dispatch({
        type: PROFILETYPES.LOADING,
        payload: true,
      });
      const res = await getDataAPI(`profile/${id}`, auth.token);
      dispatch({
        type: PROFILETYPES.GET_USER,
        payload: res.data,
      });
      dispatch({
        type: PROFILETYPES.LOADING,
        payload: false,
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  }
};

export const updateProfile = ({ avatar, editData, auth }) => async (
  dispatch
) => {
  if (!editData.fullname)
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { errFullname: "Please add your fullname" },
    });
  if (editData.fullname.length > 25)
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { errFullname: "Fullname is too long" },
    });
  if (editData.story.length > 200)
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { errStory: "Your story is too long" },
    });
  try {
    let media;
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    if (avatar) media = await cloudUpload([avatar]);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

    await patchDataAPI(
      "user",
      {
        ...editData,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    );

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          ...editData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const followAction = ({ users, user, auth }) => (dispatch) => {
  const newUser = { ...user, followers: [...user.followers, auth.user] };
  dispatch({
    type: PROFILETYPES.FOLLOW,
    payload: newUser,
  });
};
