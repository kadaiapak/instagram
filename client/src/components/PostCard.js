import React from "react";
import Comments from "./home/Comments";
import InputComment from "./home/InputComment";
import CardBody from "./home/postcard/CardBody";
import CardFooter from "./home/postcard/CardFooter";
import CardHeader from "./home/postcard/CardHeader";

const PostCard = ({ post }) => {
  return (
    <div className="card my-3">
      <CardHeader post={post} />
      <CardBody post={post} />
      <CardFooter post={post} />

      <Comments post={post} />
      <InputComment post={post} />
    </div>
  );
};

export default PostCard;
