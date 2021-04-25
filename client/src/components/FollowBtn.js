import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// import action
import { followAction, unfollowAction } from "../redux/actions/profileAction";

const FollowBtn = ({ user }) => {
  const dispatch = useDispatch();

  const { auth, profile } = useSelector((state) => state);
  const [follow, setFollow] = useState(false);

  const followHandler = () => {
    setFollow(true);
    dispatch(followAction({ users: profile.users, user, auth }));
  };

  const unfollowHandler = () => {
    setFollow(false);
    dispatch(unfollowAction({ users: profile.users, user, auth }));
  };

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollow(true);
    }
  }, [user._id, auth.user.following]);
  return (
    <>
      {follow ? (
        <button className="unfollow" onClick={unfollowHandler}>
          Unfollow
        </button>
      ) : (
        <button className="follow" onClick={followHandler}>
          Follow
        </button>
      )}
    </>
  );
};

export default FollowBtn;
