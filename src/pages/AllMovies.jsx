import { useLoaderData } from "react-router-dom";
import AllMovie from "../Components/AllMovie";

const AllMovies = () => {
  const loaderData = useLoaderData();

  return (
    <div className="grid grid-cols-4 gap-10 items-start">
      {loaderData.map((movie) => (
        <AllMovie key={movie._id} movie={movie}></AllMovie>
      ))}
    </div>
  );
};

export default AllMovies;
