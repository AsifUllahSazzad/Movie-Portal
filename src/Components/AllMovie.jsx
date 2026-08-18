import React from "react";
import './AllMovie.css'

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
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure
      className="movie-poster-fade"
      style={{ backgroundImage: `url(${moviePoster})` }}>
        <img src={moviePoster} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Card Title</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default AllMovie;
