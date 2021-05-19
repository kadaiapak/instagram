import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { createPost } from "../redux/actions/postAction";

const StatModal = () => {
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [content, setContent] = useState("");
  const { auth, alert, theme } = useSelector((state) => state);

  // untuk keperluan webcame capture
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState("");
  const videoRef = useRef();
  const refCanvas = useRef();
  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  // untuk capture webcame
  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  };

  //akhir dari fiture webcam capture

  const deleteHandler = (index) => {
    const newArr = [...images];

    newArr.splice(index, 1);
    setImages(newArr);
  };

  const imageHandler = (e) => {
    //ambil semua file
    const files = [...e.target.files];
    let newImages = [];
    let err = "";
    files.forEach((file) => {
      if (!file) return (err = "Select Image");
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        return (err = "Image ins Incorrect");
      }
      return newImages.push(file);
    });
    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
  };

  const submitStat = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "insert an image" },
      });
    }
    dispatch(createPost({ content, images, auth }));
    setContent("");
    setImages([]);
    if (tracks) tracks.stop();
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: false,
    });
  };
  return (
    <div className="status_modal">
      <form onSubmit={submitStat}>
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
          <textarea
            name="content"
            value={content}
            placeholder={`${auth.user.username}, what are you thinking ?`}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* // div untuk show image yang di upload */}
          <div className="show_images">
            {images.map((img, index) => (
              <div id="file_img" key={index}>
                <img
                  className="img-thumbnail"
                  src={img.camera ? img.camera : URL.createObjectURL(img)}
                  alt="status"
                  style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                />
                <span onClick={() => deleteHandler(index)}>&times;</span>
              </div>
            ))}
          </div>

          {stream && (
            <div className="stream position-relative">
              <video
                autoPlay
                muted
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                ref={videoRef}
                width="100%"
                height="100%"
              />
              <span onClick={handleStopStream}>&times;</span>
              <canvas ref={refCanvas} style={{ display: "none" }} />
            </div>
          )}

          <div className="input_images">
            {stream ? (
              <i className="fas fa-camera" onClick={handleCapture} />
            ) : (
              <>
                <i className="fas fa-camera" onClick={handleStream} />
                <div className="file_upload">
                  <i className="fas fa-image" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*"
                    onChange={imageHandler}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {alert.error && (
          <div className="status_error text-center">
            <small className="form-text text-danger">{alert.error}</small>
          </div>
        )}

        <div className="status_footer my-2">
          <button className="btn btn-dark w-100">Post</button>
        </div>
      </form>
    </div>
  );
};

export default StatModal;
