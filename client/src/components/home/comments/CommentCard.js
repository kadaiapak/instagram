import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../Avatar";
import moment from "moment";

const CommentCard = ({ post, comment }) => {
  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (comment) setContent(comment.content);
  }, [comment]);
  return (
    <div className="comment_card mt-2">
      <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
        <Avatar src={comment.user.avatar} size="medium-avatar" />
        <h6 className="mx-2">{comment.user.username}</h6>
      </Link>

      <div className="comment_content">
        <div className="flex-fill">
          <span>
            {content.length < 100
              ? content
              : readMore
              ? content + ""
              : content.slice(0, 100) + "..."}
          </span>
          {content.length > 100 && (
            <span onClick={() => setReadMore(!readMore)} className="d-block">
              {readMore ? "Hide content" : "more..."}
            </span>
          )}
        </div>
        <div>
          <small className="">{moment(comment.createdAt).fromNow()}</small>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
