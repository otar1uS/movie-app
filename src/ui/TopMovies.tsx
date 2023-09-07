import { MovieCardProps } from "../types/TypesForUI";
import { useState } from "react";
import MovieDetails from "./MovieDetails";
import { Link } from "react-router-dom";

function TopMovies({
  id,
  number,
  title,
  releaseDate,
  rating,
  genres,
  country,
  img,
  isItMovie,
  runtime,
  voteCount,
  description,
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="h-[7rem] relative flex border-none rounded-2xl bg-black  cursor-pointer hover:bg-mainColor"
    >
      <div
        className={`absolute left-[-1.5rem] z-[100] top-[2rem] w-[3rem] ${
          isHovered ? `bg-mainColor text-[#000] ` : `bg-black text-mainColor`
        }  h-[3rem]    text-[1.8rem] flex justify-center items-center rounded-3xl border-[2px] font-[600] border-[#00ACC1]`}
      >
        {number! + 1}
      </div>

      <Link to={`/display/${isItMovie}/${id}`}>
        <img
          src={`https://image.tmdb.org/t/p/original${img}`}
          alt="top movies img"
          className="w-[5rem] h-[7rem] rounded-tl-2xl rounded-bl-2xl "
        />
      </Link>

      {isHovered && (
        <MovieDetails
          isItTopMovies={true}
          title={title}
          releaseDate={releaseDate}
          rating={rating}
          genres={genres}
          country={country}
          isItMovie={isItMovie}
          runtime={runtime}
          voteCount={voteCount}
          description={description}
        />
      )}
      <div
        className={`${
          isHovered ? `text-[#000] ` : `text-grayText`
        }  py-[1rem] px-[1rem]  flex gap-3 flex-col text-[1.4rem] leading-7 `}
      >
        <p className="text-start">{`MOVIE / ${releaseDate?.slice(
          0,
          4
        )} / ${runtime} min`}</p>
        <h1
          className={` ${
            isHovered ? `text-[#000]` : `text-white`
          } text-[1.7rem] leading-10  `}
        >
          {title!.length > 35 ? `${title?.slice(0, 35)}...` : title}
        </h1>
      </div>
    </div>
  );
}

export default TopMovies;
