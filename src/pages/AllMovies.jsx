import React from "react";
import { useLoaderData } from "react-router-dom";
import AllMovie from "../Components/AllMovie";

const AllMovies = () => {
  const loaderData = useLoaderData();

//   console.log(loaderData);

  return (
    <div className="grid grid-cols-4 gap-10">
      {loaderData.map((movie) => (
        <AllMovie key={movie._id} movie={movie}></AllMovie>
      ))}
    </div>
  );
};

export default AllMovies;
