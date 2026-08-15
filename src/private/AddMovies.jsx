
const AddMovies = () => {
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


  // release year
  const date = new Date().getFullYear()
  const year = Array.from({length: 50}, (_,i) => date - i)





  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Add Movie</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Movie Poster (URL)</label>
              <input type="url" className="input" placeholder="https://" />

              <label className="label">Movie Title</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. Inception"
              />

              <label className="label">Genre</label>
              <select className="select">
                <option className="text-gray-400">Select genre</option>
                {
                    genres.map((g) => <option key={g} value={g}>{g}</option>)
                }
              </select>

              <label className="label">Duration (minutes)</label>
              <input type="number" className="input" placeholder="e.g. 148" />

              <label className="label">Release Year</label>
              <select className="select">
                <option className="text-gray-400">Select year</option>
                {
                    year.map((y) => <option key={y}>{y}</option>)
                }
              </select>

              <label className="label">Rating</label>
                

              <label className="label">Summary</label>
              <input type="password" className="input" placeholder="Password" />

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovies;
