import React from "react";
import { useSelector } from "react-redux";

import CardBody from "./postcard/CardBody";
import CardFooter from "./postcard/CardFooter";
import CardHeader from "./postcard/CardHeader";

const Posts = () => {
  const { homePost } = useSelector((state) => state);
  return (
    <div>
      {homePost.posts.map((post) => (
        <div key={post._id} className="card my-3">
          <CardHeader post={post} />
          <CardBody post={post} />
          <CardFooter post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
