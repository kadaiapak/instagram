import React from "react";
import { useSelector } from "react-redux";

const LikeButton = ({ isLike, likeHandler, dislikeHandler }) => {
  const { theme } = useSelector((state) => state);
  return (
    <>
      {isLike ? (
        <i
          className="fas fa-heart text-danger"
          onClick={dislikeHandler}
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
        />
      ) : (
        <i className="far fa-heart" onClick={likeHandler} />
      )}
    </>
  );
};

export default LikeButton;
