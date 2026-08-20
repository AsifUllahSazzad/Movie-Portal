import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";

const MovieDetails = () => {
  const movieDetails = useLoaderData();

  const {
    "Movie Poster": moviePoster,
    "Movie Title": movieTitle,
    "Release Year": releaseYear,
    Duration,
    Rating: movieRating,
    Summary,
    Genre,
    _id,
    Email,
  } = movieDetails;

  const [value] = useState(movieRating);

  return (
    <div className="flex justify-center gap-x-5">
      <div className="size-140">
        <img className="rounded-2xl" src={moviePoster} alt={movieTitle} />
      </div>
      <div className="w-1/2 p-4">
        <div className="inline-block space-y-4">
          <h1 className="text-7xl text-left">{movieTitle}</h1>
          <ul className="flex justify-center w-full space-x-4 text-lg list-disc list-inside text-[#bec2c5]">
            <li className="list-none">{releaseYear}</li>
            <li>{Duration}</li>
          </ul>
          <div className="flex justify-between items-center space-y-4">
            <span className="btn rounded-3xl bg-[#40454a] text-white py-2 px-4 text-base font-normal cursor-auto">
              {Genre}
            </span>

            <div className="flex items-center space-x-2">
              <Rating
                name="rating"
                value={value}
                precision={0.5}
                readOnly
                emptyIcon={
                  <StarIcon
                    style={{ opacity: 0.55, color: "#dde0e2" }}
                    fontSize="inherit"
                  />
                }
              />

              <span className="text-[#e8ebec]">{movieRating}</span>
            </div>
          </div>
        </div>

        <p className="text-left text-xl leading-9">{Summary}</p>

        <div className="flex justify-start gap-x-4 mt-4">
          <Button
            sx={{
              backgroundColor: "#40454a",
              color: "white",
              "&:hover": { backgroundColor: "#5a6169" },
            }}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Delete Movie
          </Button>
          <Button
            sx={{
              backgroundColor: "#40454a",
              color: "white",
              "&:hover": { backgroundColor: "#5a6169" },
            }}
            variant="outlined"
            startIcon={<FavoriteIcon />}
          >
            Add to Favorite
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
