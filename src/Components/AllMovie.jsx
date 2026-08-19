import React from "react";
import "./AllMovie.css";

const AllMovie = ({ movie }) => {
  const {
    "Movie Poster": moviePoster,
    "Movie Title": movieTitle,
    "Release Year": releaseYear,
    Duration,
    Rating,
    Summary,
    Genre,
    _id,
    Email,
  } = movie;

  // convert hours
  const formatDuration = (minutes) => {
    const mins = Number(minutes);
    if (!mins || isNaN(mins)) return "";

    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;

    return `${hours}h ${remainingMins}min`;
  };

  return (
    <div className="card bg-base-100 w-96 shadow-2xl">
      <figure
        className="movie-poster-fade"
        style={{ backgroundImage: `url(${moviePoster})` }}
      >
        <img src={moviePoster} alt="Shoes" />
      </figure>
      <div className="card-body -mt-3">
        <h2 className="card-title text-3xl font-normal">{movieTitle}</h2>
        <div className="space-x-2 -mt-2 text-base text-[#818181] font-semibold">
          <span>{Genre} /</span>

          <span>{formatDuration(Duration)} /</span>

          <span>{releaseYear}</span>
        </div>

        <div className="text-base flex justify-between items-center">
          <span className="uppercase text-[#e7e7e7]">Summary</span>
          <span>{Rating}</span>
        </div>
        {/* <p>{Summary}</p> */}

        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default AllMovie;
