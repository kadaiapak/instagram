import React from "react";
import { useSelector } from "react-redux";

import Posts from "../components/home/Posts";
import Status from "../components/home/Status";
import LoadIcon from "../images/loading.gif";

const Home = () => {
  const { homePost } = useSelector((state) => state);
  return (
    <div className="home row mx-0">
      <div className="col-md-8">
        {/* untuk menampilkan component yang berguna untuk buat status */}
        <Status />

        {homePost.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto"></img>
        ) : homePost.result === 0 ? (
          <h2>No Post</h2>
        ) : (
          <Posts />
        )}
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};

export default Home;
