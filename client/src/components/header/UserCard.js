import React from "react";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
const UserCard = ({
  children,
  user,
  border,
  closeHandle,
  setShowFollowers,
  setShowFollowing,
}) => {
  const handleCloseAll = () => {
    if (closeHandle) closeHandle();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };
  return (
    <div className={` d-flex p-2 ${border} justify-content-between`}>
      <div>
        <Link
          to={`/profile/${user._id}`}
          className="d-flex align-items-center"
          onClick={handleCloseAll}
        >
          <Avatar src={user.avatar} size="small-avatar" />
          <div className="ml-3" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block username">{user.username}</span>
            <small style={{ opacity: "0.7" }}>{user.fullname}</small>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default UserCard;
