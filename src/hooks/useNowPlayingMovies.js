import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getNowPlayingMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const data = await res.json();
    dispatch(addNowPlayingMovies(data.results));
  };

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  }, [getNowPlayingMovies, nowPlayingMovies]);
};

export default useNowPlayingMovies;
