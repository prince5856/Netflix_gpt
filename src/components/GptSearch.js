import React from "react";
import GptsearchBar from "./GptsearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div className=" fixed -z-10">
        <img
          className=" h-screen object-cover md:h-auto"
          src={BG_URL}
          alt="bg-img"
        />
      </div>
      <div>
        <GptsearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;
