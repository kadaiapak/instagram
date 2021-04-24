import React from "react";

const NotFound = () => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <h2
        className="text-secondary"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          // width: "100%",
          transform: "translate(-50%, -50%)",
        }}
      >
        404 | Not Found.
      </h2>
    </div>
  );
};

export default NotFound;
