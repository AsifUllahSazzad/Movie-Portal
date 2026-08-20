import { useContext, useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import { RiErrorWarningLine } from "react-icons/ri";
import { AuthContext } from "../Provider/AuthProvider";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddMovies = () => {
  // Toast
  const notify = () => toast("Wow so easy !");

  // current user
  const { currentUser } = useContext(AuthContext);

  // genres for select option
  const genres = [
    "Comedy",
    "Drama",
    "Horror",
    "Action",
    "Thriller",
    "Romance",
    "Sci-Fi",
    "Animation",
  ];

  // rating for movie
  const labels = {
    0.5: "Terrible",
    1: "Bad",
    1.5: "Poor",
    2: "Below Average",
    2.5: "Average",
    3: "Above Average",
    3.5: "Good",
    4: "Very Good",
    4.5: "Great",
    5: "Outstanding",
  };
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const getLabelText = (value) => {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  };

  // release year for select option
  const date = new Date().getFullYear();
  const year = Array.from({ length: 50 }, (_, i) => date - i);

  // user input state
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [rating, setRating] = useState(null);

  // error state for user input validation
  const [posterError, setPosterError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [genreError, setGenreError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [releaseYearError, setReleaseYearError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [summaryError, setSummaryError] = useState("");

  // Poster validation check
  const handlePosterValidation = async (poster) => {
    // input exists and type check
    if (!poster || typeof poster !== "string") {
      return { valid: false, error: "Movie Poster link is required." };
    }

    // start and ending space remove
    const trimmed = poster.trim();

    // check middle space
    const hasSpace = /\s/.test(trimmed);

    if (hasSpace) {
      return { valid: false, error: "Link cannot contain space." };
    }

    // after trim check if the input is a valid URL
    let url;
    try {
      url = new URL(trimmed);
    } catch {
      return { valid: false, error: "Please provide a valid link." };
    }

    // check http or https protocol
    if (!["https:", "http:"].includes(url.protocol)) {
      return {
        valid: false,
        error: "Link must start with http:// or https://",
      };
    }

    // image validation check
    //1st image extension check (no network call)
    const IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|avif|bmp|svg)(\?.*)?$/i;

    if (!IMAGE_EXTENSIONS.test(url.pathname + url.search)) {
      return {
        valid: false,
        error: "Link doesn't look like a direct image file (.jpg, .png, etc).",
      };
    }

    // 2nd image load check (network call)
    return new Promise((resolve) => {
      const img = new Image();

      const timeOut = setTimeout(() => {
        img.src = "";
        resolve({ valid: false, error: "Image took too long to load." });
      }, 7000);

      img.onload = () => {
        clearTimeout(timeOut);
        resolve({ valid: true, error: "" });
      };

      img.onerror = () => {
        clearTimeout(timeOut);
        resolve({
          valid: false,
          error: "Link doesn't point to a loadable image.",
        });
      };

      img.src = trimmed;
    });

    return { valid: true, error: "" };
  };

  // Movie title validation check
  const handleTitleValidation = async (title) => {
    // input exists and type check
    if (!title || typeof title !== "string") {
      return {
        valid: false,
        error: "Movie Title is required.",
      };
    }

    // start and ending space remove
    const trimmed = title.trim();

    // after trim check if the input is empty
    if (trimmed.length === 0) {
      return {
        valid: false,
        error: "Movie Title is required.",
      };
    }

    // check if the input is at least 2 characters long
    if (trimmed.length < 2) {
      return {
        valid: false,
        error: "Movie Title must be at least 2 characters.",
      };
    }

    // movie existence check in the database
    try {
      const res = await fetch(`http://localhost:3000/movies/${trimmed}`);

      const data = await res.json();
      if (data) {
        return { valid: false, error: "Movie already exists in the database." };
      }
    } catch (error) {
      return { valid: true, error: "" };
    }
    return { valid: true, error: "" };
  };

  // Duration validation check
  const handleDurationValidation = (duration) => {
    // check if the input is empty
    if (!duration) {
      return {
        valid: false,
        error: "Duration is required.",
      };
    }

    // check duration greater than 60 minutes
    const numDuration = Number(duration);
    if (numDuration <= 60) {
      return {
        valid: false,
        error: "Duration must be greater than 60 minutes.",
      };
    }

    return { valid: true, error: "" };
  };

  // Summary validation check
  const handleSummaryValidation = (summary) => {
    // check if the input is empty or not a string
    if (!summary || typeof summary !== "string") {
      return {
        valid: false,
        error: "Summary is required.",
      };
    }

    // trim the summary to remove leading and trailing whitespace
    const trimmedSummary = summary.trim();

    // after trim check if the input is empty
    if (trimmedSummary.length === 0) {
      return { valid: false, error: "Summary is required." };
    }

    // additional check for minimum length of the summary
    if (trimmedSummary.length < 10) {
      return { valid: false, error: "Summary must be at least 10 characters." };
    }

    return { valid: true, error: "" };
  };

  const navigate = useNavigate();

  // handle form submission
  const handleAddMovie = async (event) => {
    event.preventDefault();

    // get form data
    const form = event.target;
    // get values from form inputs
    const poster = form.posterUrl.value;
    const title = form.movieTitle.value;
    const duration = form.duration.value;
    const summary = form.summary.value;

    // error state reset before validation
    setPosterError("");
    setTitleError("");
    setGenreError("");
    setDurationError("");
    setReleaseYearError("");
    setRatingError("");
    setSummaryError("");

    // poster validation check
    const posterValidation = await handlePosterValidation(poster);
    if (!posterValidation.valid) {
      setPosterError(posterValidation.error);
      return;
    }

    // title validation check
    const titleValidation = await handleTitleValidation(title);
    if (!titleValidation.valid) {
      setTitleError(titleValidation.error);
      return;
    }

    // genre validation check
    if (!genre || typeof genre !== "string") {
      setGenreError("Please select a genre.");
      return;
    }

    // duration validation check
    const durationValidation = handleDurationValidation(duration);

    if (!durationValidation.valid) {
      setDurationError(durationValidation.error);
      return;
    }

    // year validation check
    if (!releaseYear) {
      setReleaseYearError("Release Year is required.");
      return;
    }

    // rating validation check
    if (!rating) {
      setRatingError("Please select a rating.");
      return;
    }

    // summary validation check
    const summaryValidation = handleSummaryValidation(summary);

    if (!summaryValidation.valid) {
      setSummaryError(summaryValidation.error);
      return;
    }

    // console.log(poster, title, genre, duration, releaseYear, rating, summary, currentUser.email);

    const newMovieAdd = {
      "Movie Poster": poster,
      "Movie Title": title,
      Genre: genre,
      Duration: duration,
      "Release Year": releaseYear,
      Rating: rating,
      Summary: summary,
      Email: currentUser.email,
    };

    // send data to the server
    try {
      const res = await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newMovieAdd),
      });

      const data = await res.json();

      if (data.insertedId || data.acknowledged) {
        toast.success("Movie added successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        // form reset and navigate to all movies page
        form.reset();
        navigate("/allMovies");
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add movie. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Add Movie</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleAddMovie} className="fieldset">
              <div className="flex flex-col gap-y-4">
                <div className="space-y-1">
                  <label className="label font-bold text-base">
                    Movie Poster (URL)
                  </label>
                  <input
                    type="url"
                    className="input w-full"
                    placeholder="https://"
                    name="posterUrl"
                  />

                  {posterError && (
                    <div className="flex items-center justify-center gap-x-1 text-red-400">
                      <span>
                        <RiErrorWarningLine />
                      </span>
                      <span>{posterError}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="label font-bold text-base">
                    Movie Title
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="e.g. Inception"
                    name="movieTitle"
                  />
                  {titleError && (
                    <div className="flex items-center justify-center gap-x-1 text-red-400">
                      <span>
                        <RiErrorWarningLine />
                      </span>
                      <span>{titleError}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 mt-2 gap-x-5">
                <div className="space-y-1">
                  <label className="label font-bold text-base">Genre</label>
                  <select
                    onChange={(e) => setGenre(e.target.value)}
                    className={`select ${genreError ? "border-red-300" : ""}`}
                    defaultValue={"Select genre"}
                  >
                    <option disabled={true} className="text-gray-400">
                      Select genre
                    </option>
                    {genres.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>

                  {genreError && (
                    <div className="flex items-center justify-center gap-x-1 text-red-400">
                      <span>
                        <RiErrorWarningLine />
                      </span>
                      <span>{genreError}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="label font-bold text-base">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    className="input"
                    placeholder="e.g. 148"
                    name="duration"
                  />

                  {durationError && (
                    <div className="flex items-center justify-center gap-x-1 text-red-400">
                      <span>
                        <RiErrorWarningLine />
                      </span>
                      <span>{durationError}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1 mt-2">
                <label className="label font-bold text-base">
                  Release Year
                </label>
                <select
                  onChange={(e) => setReleaseYear(e.target.value)}
                  className="select w-full"
                  defaultValue={"Select year"}
                >
                  <option disabled={true} className="text-gray-400">
                    Select year
                  </option>
                  {year.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>

                {releaseYearError && (
                  <div className="flex items-center justify-center gap-x-1 text-red-400">
                    <span>
                      <RiErrorWarningLine />
                    </span>
                    <span>{releaseYearError}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1 mt-2">
                <label className="label font-bold text-base">Rating</label>

                <div className="flex justify-between select bg-none w-full">
                  <Rating
                    name="rating"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                      setRating(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {value !== null && (
                    <Box sx={{}}>{labels[hover !== -1 ? hover : value]}</Box>
                  )}
                </div>

                {ratingError && (
                  <div className="flex items-center justify-center gap-x-1 text-red-400">
                    <span>
                      <RiErrorWarningLine />
                    </span>
                    <span>{ratingError}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col mt-2 space-y-1">
                <label className="label font-bold text-base">Summary</label>
                <textarea
                  name="summary"
                  className="textarea w-full"
                  placeholder="A short summary of the movie..."
                ></textarea>

                {summaryError && (
                  <div className="flex items-center justify-center gap-x-1 text-red-400">
                    <span>
                      <RiErrorWarningLine />
                    </span>
                    <span>{summaryError}</span>
                  </div>
                )}
              </div>

              <button className="btn btn-neutral mt-4">Add Movie</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovies;
