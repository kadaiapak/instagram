import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileUsers } from "../../redux/actions/profileAction";
import Avatar from "../Avatar";
import FollowBtn from "../FollowBtn";
import EditProfile from "./EditProfile";
import Followers from "./Followers";
import Following from "./Following";

const Info = () => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState([]);

  // state untuk toggle followers dan folloing Modal
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  //state untuk toggle Edit Modal
  const [onEdit, setOnEdit] = useState(false);

  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  useEffect(() => {
    if (id === auth.user._id) {
      setUserProfile([auth.user]);
    } else {
      dispatch(getProfileUsers({ users: profile.users, id, auth }));
      setUserProfile(
        profile.users.filter((user) => {
          return user._id === id;
        })
      );
    }
  }, [id, auth, dispatch, profile.users, profile.users.followers]);
  return (
    <div className="info">
      {userProfile.map((user) => (
        <div className="info_container" key={user._id}>
          <Avatar src={user.avatar} size="super-avatar" />
          <div className="info_content">
            <div className="info_content_title">
              <h2>{user.username}</h2>
              {user._id === auth.user._id ? (
                <button
                  className="btn btn-outline-info"
                  onClick={() => setOnEdit(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>
            <div className="follow_btn">
              <span className="mr-4" style={{ color: "black" }}>
                27 posts
              </span>
              <span
                className="mr-4"
                style={{ color: "black" }}
                onClick={() => setShowFollowers(true)}
              >
                {user.followers.length} followers
              </span>
              <span
                style={{ color: "black" }}
                onClick={() => setShowFollowing(true)}
              >
                {user.following.length} following
              </span>
            </div>
            <h6 style={{ marginTop: "10px", marginBottom: "0" }}>
              {user.fullname} {user.mobile}
            </h6>
            <p className="m-0">{user.address}</p>
            <h6 className="m-0">{user.email}</h6>
            <a href={user.website} target="_blank" rel="noreferrer">
              {user.website}
            </a>
            <p className="m-0">{user.story}</p>
          </div>
          {auth.user._id === user._id && onEdit && (
            <EditProfile setOnEdit={setOnEdit} />
          )}
          {showFollowers && (
            <Followers
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowing && (
            <Following
              users={user.following}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
