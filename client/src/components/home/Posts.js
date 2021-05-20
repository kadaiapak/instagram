import React from "react";
import { useSelector } from "react-redux";

import LoadingIcon from "../../images/loading.gif";

const Posts = () => {
  const { alert } = useSelector((state) => state);
  return (
    <div>
      {alert.loading ? (
        <img src={LoadingIcon} alt="loading" className="d-block mx-auto"></img>
      ) : (
        <h1>Post</h1>
      )}
    </div>
  );
};

export default Posts;
