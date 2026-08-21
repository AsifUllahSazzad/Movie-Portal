import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Swal from "sweetalert2";

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

  // delete movie function
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#40454a",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    setIsDeleting(true);

    try {
      const response = await fetch(
        `http://localhost:3000/movies/${encodeURIComponent(movieTitle)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) throw new Error("Unable to delete movie");

      const data = await response.json();
      if (data.deletedCount === 0) throw new Error("Movie was not found");

      await Swal.fire({
        title: "Deleted!",
        text: "The movie has been deleted successfully.",
        icon: "success",
        confirmButtonColor: "#2e7d32",
      });

      navigate("/allMovies");
    } catch (error) {
      await Swal.fire({
        title: "Delete failed",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#40454a",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  //
  // const [isFavorited, setIsFavorited] = useState(false);
  // useEffect(() => {
  //   console.log('hi')
  //   fetch(
  //     `http://localhost:3000/favoritesMovies/check?email=${encodeURIComponent(Email)}&title=${encodeURIComponent(movieTitle)}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     },
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setIsFavorited(true);
  //     });
  // }, [Email, movieTitle]);

  // const [isFavoriting, setFavoriting] = useState(false);
  const handleFavorite = async (email) => {
    const favMovies = {
      MoviePoster: moviePoster,
      MovieTitle: movieTitle,
      Genre,
      Duration,
      ReleaseYear: releaseYear,
      Rating: movieRating,
      Email: email,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/favoritesMovies/${encodeURIComponent(email)}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(favMovies),
        },
      );

      const result = await response.json();

      if (!result.alreadyExists) {
        setFavoriting(true);
      }

      if (result.status === 409) {
        return;
      }
    } catch (error) {
      console.log("Error");
    }

    // console.log(email)
  };

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
              "&.Mui-disabled": {
                backgroundColor: "#6b4f50",
                borderColor: "#6b4f50",
                color: "#e6c8c9",
              },
            }}
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Movie"}
          </Button>
          <Button
            disabled={isFavorited || isFavoriting}
            onClick={() => handleFavorite(Email)}
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
