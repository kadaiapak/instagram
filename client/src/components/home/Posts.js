import React from "react";
import { useSelector } from "react-redux";

const Posts = () => {
  const { alert } = useSelector((state) => state);
  return (
    <div>
      {alert.loading ? (
        <img
          src="/images/loading.gif"
          alt="loading"
          style={{ width: "60px", textAlign: "center" }}
        ></img>
      ) : (
        <h1>Post</h1>
      )}
    </div>
  );
};

export default Posts;
