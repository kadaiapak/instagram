import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";
import { useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Status = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  return (
    <div className="status my-3 d-flex">
      <Avatar src={auth.user.avatar} size="big-avatar" />
      <button
        className="statusBtn flex-fill"
        // untuk membuat status pada redux menjadi true, sehingga bisa men toggle status modal yang ada pada App.js
        onClick={() =>
          dispatch({
            type: GLOBALTYPES.STATUS,
            payload: true,
          })
        }
      >
        {auth.user.username}, what are you thinking?
      </button>
    </div>
  );
};

export default Status;
