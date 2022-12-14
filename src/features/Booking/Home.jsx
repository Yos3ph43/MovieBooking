import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CinemaSchedule from "./components/CinemaSchedule";
import HomeCarousel from "./components/HomeCarousel";
import MovieList from "./components/MovieList";
import {
  fetchBannersAction,
  fetchCinemasAction,
  fetchMoviesAction,
} from "./redux/action";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBannersAction);
    dispatch(fetchMoviesAction);
    dispatch(fetchCinemasAction);
  }, []);
  return (
    <div className="bg-gray-900">
      <HomeCarousel />
      <MovieList />
      <CinemaSchedule />
    </div>
  );
};

export default Home;
/** 
1/ Tạo url API (hằng số API, apiPath)
2/ Tạo Type redux
3/ Tạo action redux
4/ Tạo reducer (slice)
5/ Dispatch
6/ useSelector
*/
