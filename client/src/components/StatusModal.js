import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

const StatusModal = () => {
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);
  console.log(auth);
  return (
    <div className="status_modal">
      <form>
        <div className="status_header">
          <h5 className="m-0">Create Post</h5>
          <span
            onClick={() =>
              dispatch({
                type: GLOBALTYPES.STATUS,
                payload: false,
              })
            }
          >
            &times;
          </span>
        </div>

        <div className="status_body">
          <textarea name="content" placeholder="what are you thinking ?" />

          <div className="input_images">
            <i className="fas fa-camera" />
            <div className="file_upload">
              <i className="fas fa-image" />
              <input
                type="file"
                name="file"
                id="file"
                multiple
                accept="image/*"
              />
            </div>
          </div>
        </div>

        <div className="status_footer my-2">
          <button className="btn btn-dark w-100">Post</button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
