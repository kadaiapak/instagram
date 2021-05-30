import React from "react";
import { useSelector } from "react-redux";
import PostCard from "../PostCard";

const Posts = () => {
  const { homePost } = useSelector((state) => state);
  return (
    <div>
      {homePost.posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Posts;

// import React from "react";
// import { useSelector } from "react-redux";
// import PostCard from "../PostCard";

// const Posts = () => {
//   const { homePost } = useSelector((state) => state);
//   return (
//     <div>
//       {homePost.posts.map((post) => (
//         <>
//           <PostCard post={post} key={post._id} />;
//         </>
//       ))}
//     </div>
//   );
// };

// export default Posts;
