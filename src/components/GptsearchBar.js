import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResult } from "../utils/gtpSlice";

const GptsearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  //Search Movies in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false",
      API_OPTIONS
    );
    const result = data.json();
    // console.log(result.result);
    return result;
  };

  const handleGTPSearchClick = async () => {
    //console.log(searchText?.current?.value);
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText?.current?.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
    // console.log("gptQuery", gptQuery);
    const GPTResult = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    if (!GPTResult.choices) {
      //TODO- if api failed
    }
    const gptMovies = GPTResult?.choices[0]?.message?.content.split(",");
    // console.log("gptMovies", gptMovies);
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbMovies = await Promise.all(promiseArray);
    // console.log("tmdbMovies", tmdbMovies);
    dispatch(
      addGPTMovieResult({
        movieNames: gptMovies,
        movieResults: tmdbMovies,
      })
    );
  };
  return (
    <div className=" pt-[45%] md:pt-[10%] flex justify-center">
      <form
        className=" w-full md:w-1/2 bg-black grid grid-cols-12 mx-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className=" p-2 m-4 col-span-9 rounded-md"
          placeholder={lang[langKey].gptSearchPlaceholder}
          ref={searchText}
        ></input>
        <button
          className=" col-span-3 m-4 px-4 py-2 bg-red-600 text-white rounded-lg"
          onClick={handleGTPSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptsearchBar;
