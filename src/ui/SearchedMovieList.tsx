import { Link } from "react-router-dom";

import { MediaData } from "../types/TypesForComponents";

function SearchedMovieList({
  searchedMovies,
}: {
  searchedMovies: MediaData[];
}) {
  return (
    <div className="w-[30rem] flex min-h-full flex-col items-center bg-[#262626] absolute  top-[4.5rem]">
      {searchedMovies
        .filter((array) => {
          return array.backdrop_path;
        })
        .slice(0, 5)
        .map((movie: MediaData) => {
          return (
            <Link
              key={movie.title}
              to={`/display/movie/${movie.id}`}
              className="h-[7rem]  flex border-none w-full     hover:text-mainColor bg-[#262626]   cursor-pointer hover:bg-[black]"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                className="w-[5rem] h-[7rem]  "
              />

              <div
                className="
          py-[1rem] px-[1rem]  flex gap-3 flex-col text-[1.4rem] leading-7 "
              >
                <p className="text-start">{`MOVIE / ${movie.release_date?.slice(
                  0,
                  4
                )} / ${movie.vote_average?.toFixed(2)}`}</p>
                <h1 className="  text-white text-[1.4rem] leading-10">
                  {movie.title && movie.title.length > 30
                    ? `${movie.title?.slice(0, 30)}...`
                    : movie.title}
                </h1>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default SearchedMovieList;
