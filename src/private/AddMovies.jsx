import { useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";

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

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Add Movie</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <div className="flex flex-col gap-y-4">
                <div className="space-y-1">
                  <label className="label font-bold text-base">
                    Movie Poster (URL)
                  </label>
                  <input
                    type="url"
                    className="input w-full"
                    placeholder="https://"
                  />
                </div>

                <div className="space-y-1">
                  <label className="label font-bold text-base">
                    Movie Title
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="e.g. Inception"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 mt-2 gap-x-5">
                <div className="space-y-1">
                  <label className="label font-bold text-base">Genre</label>
                  <select className="select" defaultValue={"Select genre"}>
                    <option disabled={true} className="text-gray-400">
                      Select genre
                    </option>
                    {genres.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="label font-bold text-base">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    className="input"
                    placeholder="e.g. 148"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="label font-bold text-base">
                  Release Year
                </label>
                <select className="select w-full" defaultValue={"Select year"}>
                  <option disabled={true} className="text-gray-400">
                    Select year
                  </option>
                  {year.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="label font-bold text-base">Rating</label>

                <div className="flex justify-between select bg-none w-full">
                  <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setValue(newValue);
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
              </div>

              <div className="flex flex-col mt-2 space-y-1">
                <label className="label font-bold text-base">Summary</label>
                <textarea
                  className="textarea w-full"
                  placeholder="A short summary of the movie..."
                ></textarea>
              </div>

              <button className="btn btn-neutral mt-4">Add</button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovies;
