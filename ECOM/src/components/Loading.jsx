import React from "react";

const Loading = () => {
  return (
    <div className=" absolute top-[50%] left-[50%]">
      <span className="loading loading-infinity loading-xs"></span>
      <span className="loading loading-infinity loading-sm"></span>
      <span className="loading loading-infinity loading-md"></span>
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  );
};

export default Loading;
