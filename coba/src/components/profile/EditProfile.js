import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../redux/actions/profileAction";
import { imageUpload } from "../../utils/imageUpload";

const EditProfile = ({ setOnEdit }) => {
  const dispatch = useDispatch();
  const initState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };
  const [editData, setEditData] = useState(initState);
  const [error, setError] = useState("");
  const { fullname, mobile, address, website, story, gender } = editData;
  const [avatar, setAvatar] = useState("");

  const { auth, alert } = useSelector((state) => state);
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = imageUpload(file);
    if (err) {
      setError(err);
      console.log(error);
    } else {
      setAvatar(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ avatar, editData, auth }));
  };

  useEffect(() => {
    setEditData(auth.user);
  }, [auth.user]);
  return (
    <div className="edit_container">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setOnEdit(false)}
      >
        Close
      </button>

      <form onSubmit={handleSubmit}>
        <div className="info_avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
          />
          <span>
            <i className="fas fa-camera"></i>
            <p>Change</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>
        <small className="text-danger d-block" style={{ marginBottom: "1rem" }}>
          {error ? `* ${error}` : ""}
        </small>

        <div className="form-group">
          <label htmlFor="fullname">Fullname</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleChange}
              autoComplete="enabled"
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: " 50%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >
              {fullname.length} / 25
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.errFullname ? alert.errFullname : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            className="form-control"
            value={mobile}
            onChange={handleChange}
            autoComplete="enabled"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={address}
            onChange={handleChange}
            autoComplete="enabled"
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            className="form-control"
            value={website}
            onChange={handleChange}
            autoComplete="enabled"
          />
        </div>

        <div className="form-group">
          <label htmlFor="story">Story</label>
          <textarea
            id="story"
            name="story"
            className="form-control"
            value={story}
            onChange={handleChange}
            autoComplete="enabled"
            cols="30"
            rows="4"
          />
          <small className="text-danger d-block text-right">
            {story ? story.length : 0}/255
          </small>
        </div>
        <small className="form-text text-danger">
          {alert.errStory ? alert.errStory : ""}
        </small>

        <label htmlFor="gender">Gender</label>
        <div className="input-group-prepend px-0 mb-4">
          <select
            name="gender"
            id="gender"
            className="custom-select text-capitalize"
            onChange={handleChange}
            value={gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" className="btn btn-info btn-block">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
