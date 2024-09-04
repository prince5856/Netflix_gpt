import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div>
      {posterPath && (
        <div className=" w-36 md:w-48 pr-4">
          <img alt="movieCard" src={IMG_CDN_URL + posterPath} />
        </div>
      )}
    </div>
  );
};

export default MovieCard;
