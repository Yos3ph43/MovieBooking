import React from "react";
import CinemaSchedule from "./components/CinemaSchedule";
import HomeCarousel from "./components/HomeCarousel";
import MovieList from "./components/MovieList";

const Home = () => {
  return (
    <div>
      <HomeCarousel />
      <MovieList />
      <CinemaSchedule />
    </div>
  );
};

export default Home;
