import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upComingMovies = useSelector((store) => store.movies.upComingMovies);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUpcomingMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );
    const data = await res.json();
    dispatch(addUpcomingMovies(data.results));
  };

  useEffect(() => {
    !upComingMovies && getUpcomingMovies();
  }, [getUpcomingMovies, upComingMovies]);
};

export default useUpcomingMovies;
