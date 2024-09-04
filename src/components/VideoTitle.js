import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[12%] px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className=" text-xl md:text-4xl font-bold ">{title}</h1>
      <p className=" hidden md:inline-block py-4 text-lg w-1/4">{overview}</p>
      <div className=" my-2 md:my-0">
        <button className=" py-1 md:py-2 px-8 bg-white text-black rounded-lg text-xl hover:bg-opacity-80">
          Play
        </button>
        <button className=" hidden md:inline-block mx-2 p-2 px-8 bg-gray-500 text-white rounded-lg text-xl bg-opacity-50 hover:bg-opacity-70">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
