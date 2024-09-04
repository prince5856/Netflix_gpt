import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const nowPlayingmovies = useSelector(
    (store) => store?.movies?.nowPlayingMovies
  );
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const upComingMovies = useSelector((store) => store.movies.upComingMovies);
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
  return (
    nowPlayingmovies && (
      <div className=" bg-black">
        <div className=" mt-0 md:-mt-52 relative z-20 pl-2 md:pl-8">
          <MovieList title={"Now Playing Movies"} movies={nowPlayingmovies} />
          <MovieList title={"Popular Movies"} movies={popularMovies} />
          <MovieList title={"Top Rated Movies"} movies={topRatedMovies} />
          <MovieList title={"Upcoming Movies"} movies={upComingMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
