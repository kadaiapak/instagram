import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Avatar from "../../Avatar";
import moment from "moment";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";

const CardHeader = ({ post }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const editHandler = () => {
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: { ...post, onEdit: true },
    });
  };
  return (
    <div className="card_header">
      <div className="d-flex">
        <Avatar src={post.user.avatar} size="medium-avatar" />

        <div className="card_name" style={{ marginLeft: "7px" }}>
          <h6 style={{ marginBottom: "-6px" }}>
            <Link to={`/profile/${post.user._id}`} className="text-dark">
              {post.user.username}
            </Link>
          </h6>
          <small className="text-muted">
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>
      <div className="nav-item dropdown">
        <span className="material-icons" id="moreLink" data-toggle="dropdown">
          more_horiz
        </span>
        <div className="dropdown-menu">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item" onClick={editHandler}>
                <span className="material-icons">create</span> Edit Post
              </div>
              <div className="dropdown-item">
                <span className="material-icons">delete_outline</span> Remove
                Post
              </div>
            </>
          )}
          <div className="dropdown-item">
            <span className="material-icons">content_copy</span> Copy Link
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
