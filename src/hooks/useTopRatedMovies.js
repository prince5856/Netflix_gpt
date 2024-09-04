import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTopRatedMoviesMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );
    const data = await res.json();
    // console.log("Hi There", data);
    dispatch(addTopRatedMovies(data.results));
  };

  useEffect(() => {
    !topRatedMovies && getTopRatedMoviesMovies();
  }, [getTopRatedMoviesMovies, topRatedMovies]);
};

export default useTopRatedMovies;
