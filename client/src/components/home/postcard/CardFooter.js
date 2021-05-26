import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Send from "../../../images/send.svg";
import LikeButton from "../LikeButton";
import { dislikePost, likePost } from "../../../redux/actions/postAction";

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const likeHandler = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likePost({ post, auth }));
    setLoadLike(false);
  };

  const dislikeHandler = async () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadLike(true);
    await dispatch(dislikePost({ post, auth }));
    setLoadLike(false);
  };

  useEffect(() => {
    if (post.likes.find((x) => x._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [post.likes, auth.user]);
  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <LikeButton
            isLike={isLike}
            likeHandler={likeHandler}
            dislikeHandler={dislikeHandler}
          />
          <Link to={`/post/${post._id}`} className="text-dark">
            <i className="far fa-comment" />
          </Link>
          <img src={Send} alt="send-svg" />
        </div>
        <i className="far fa-bookmark" />
      </div>
      <div className="d-flex justify-content-between">
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.likes.length} likes
        </h6>
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.comments.length} comments
        </h6>
      </div>
    </div>
  );
};

export default CardFooter;
