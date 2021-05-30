import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";

const InputComment = ({ post }) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  const { auth } = useSelector((state) => state);
  const commentSubmit = (e) => {
    e.preventDefault();
    setContent("");
    const newComment = {
      content,
      user: auth.user,
      likes: [],
      createdAt: new Date().toISOString(),
    };
    // jika value yang dikirim tidak memakai kurung kurawal
    //contoh createComment({post, newCOmment, auth}) maka di action, pemanggilan value ini juga tidak boleh
    // memakai kurung kurawal
    //contoh createComment = (post, newCmment, auth) => async(dispatch) => {}
    //kalau pakai kurung kurawal ({post, newComment, auth}) maka akan terjadi error
    dispatch(createComment({ post, newComment, auth }));
  };
  return (
    // card-footer adalah class spesific agar ada padding
    <form className="card-footer comment_input" onSubmit={commentSubmit}>
      <input
        type="text"
        placeholder="Add your comments"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="postBtn">
        Post
      </button>
    </form>
  );
};

export default InputComment;
