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

  console.log(Duration);

  return (
    <div className="card bg-base-100 w-96 shadow-2xl">
      <figure
        className="movie-poster-fade"
        style={{ backgroundImage: `url(${moviePoster})` }}
      >
        <img src={moviePoster} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl font-normal">{movieTitle}</h2>
       <div>
         <p>
          {/* {Summary} */}
        </p>
       </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default AllMovie;
