import { useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import { RiErrorWarningLine } from "react-icons/ri";
import { duration } from "@mui/material/styles";

const AddMovies = () => {
  // genres
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

  // rating
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

  // release year
  const date = new Date().getFullYear();
  const year = Array.from({ length: 50 }, (_, i) => date - i);

  //

  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [rating, setRating] = useState(null);

  // poster url validation check
  const [posterError, setPosterError] = useState("");
  const handlePosterValidation = (poster) => {
    // input exists and type check
    if (!poster || typeof poster !== "string") {
      return { valid: false, error: "Movie Poster link is required." };
    }

    // start and ending space remove
    const trimmed = poster.trim();

    // check space
    const hasSpace = /\s/.test(trimmed);

    if (hasSpace) {
      return { valid: false, error: "Link cannot contain space." };
    }

    // check url is right or not
    let url;
    try {
      url = new URL(trimmed);
    } catch {
      return { valid: false, error: "Please provide a valid link." };
    }

    // check https:// or http://
    if (!["https:", "http:"].includes(url.protocol)) {
      return {
        valid: false,
        error: "Link must start with http:// or https://",
      };
    }
    setPosterError("");
    return { valid: true, error: "" };
  };

  // Movie title validation
  const [titleError, setTitleError] = useState("");
  const handleTitleValidation = (title) => {
    // input exists check
    if (!title || typeof title !== "string") {
      return {
        valid: false,
        error: "Movie Title is required.",
      };
    }

    // start and ending space remove
    const trimmed = title.trim();

    // after check tilte exists
    if (trimmed.length === 0) {
      return {
        valid: false,
        error: "Movie Title is required.",
      };
    }

    // check atleast 2 character
    if (trimmed.length < 2) {
      return {
        valid: false,
        error: "Movie Title must be at least 2 characters.",
      };
    }

    setTitleError("");
    return { valid: true, error: "" };
  };

  // duration validation check
  const [durationError, setDurationError] = useState("");
  const handleDurationValidation = (duration) => {
    // check the input isn't empty
    if (!duration) {
      return {
        valid: false,
        error: "Duration is required.",
      };
    }

    // convert number
    const numDuration = Number(duration);
    if (numDuration <= 60) {
      return {
        valid: false,
        error: "Duration must be greater than 60 minutes.",
      };
    }

    setDurationError("");
    return { valid: true, error: "" };
  };

  const handleSummaryValidation = (summary) => {
    //check the input isn't empty and type
    if (!summary || typeof summary !== "string") {
      return {
        valid: false,
        error: "Summary is required.",
      };
    }

    // trim whitespace
    const trimmedSummary = summary.trim();

    // after trim check summary isn't empty
    if (!trimmedSummary.length === 0) {
      return { valid: false, error: "Summary is required." };
    }

    // at least 10 character
    if (trimmedSummary.length < 10) {
      return { valid: false, error: "Summary must be at least 10 characters." };
    }

    setSummaryError("");

    return { valid: true, error: "" };
  };

  const [genreError, setGenreError] = useState("");
  const [releaseYearError, setReleaseYearError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [summaryError, setSummaryError] = useState("");

  const handleAddMovie = (event) => {
    event.preventDefault();

    const form = event.target;

    const poster = form.posterUrl.value;
    const title = form.movieTitle.value;
    const duration = form.duration.value;
    const summary = form.summary.value;

    // console.log(poster, title, genre, duration, releaseYear, rating, summary);

    // poster validation check
    const posterValidation = handlePosterValidation(poster);
    if (!posterValidation.valid) {
      setPosterError(posterValidation.error);
      return;
    }

    // title validation check
    const titleValidation = handleTitleValidation(title);
    if (!titleValidation.valid) {
      setTitleError(titleValidation.error);
      return;
    }

    // genre validation check
    setGenreError("");
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
    setReleaseYearError("");
    if (!releaseYear) {
      setReleaseYearError("Release Year is required.");
      return;
    }

    // rating validation check
    setRatingError("");
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
                    required
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
                    name="hover-feedback"
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
