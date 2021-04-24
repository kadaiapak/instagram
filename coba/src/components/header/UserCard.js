import React from "react";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
const UserCard = ({ user, border, closeHandle }) => {
  return (
    <div className={`p-2 ${border}`}>
      <div>
        <Link
          to={`/profile/${user._id}`}
          className="d-flex align-items-center"
          onClick={closeHandle}
        >
          <Avatar src={user.avatar} size="small-avatar" />
          <div className="ml-3" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block username">{user.username}</span>
            <small style={{ opacity: "0.7" }}>{user.fullname}</small>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
