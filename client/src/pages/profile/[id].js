import React from "react";
import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import { useSelector } from "react-redux";

const Profile = () => {
  const { profile } = useSelector((state) => state);
  return (
    <div className="profile">
      {profile.loading ? (
        <img
          src="../images/loading.gif"
          alt="loading"
          className="d-block mx-auto my-4"
          style={{ width: "50px", height: "50px" }}
        ></img>
      ) : (
        <Info />
      )}
      <Posts />
    </div>
  );
};

export default Profile;
