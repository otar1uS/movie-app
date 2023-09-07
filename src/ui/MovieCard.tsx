import { useState, useRef, useEffect } from "react";
import { MovieCardProps } from "../types/TypesForUI";
import MovieDetails from "./MovieDetails";
import { Link } from "react-router-dom";
import { AiFillFolderOpen } from "react-icons/ai";
import Sent from "./Sent";

function MovieCard({
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
  numberOfSeasons,
  id,
  itsUserPage,
}: MovieCardProps) {
  const [showBox, setShowBox] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredImg, setIsHoveredImg] = useState(false);
  const [isFileHovered, setIsFileHovered] = useState(false);

  const data = {
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
    numberOfSeasons,
    id,
    itsUserPage,
  };

  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setShowBox(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleFileMouseEnter = () => {
    setIsFileHovered(true);
  };
  const handleFileMouseLeave = () => {
    setIsFileHovered(false);
  };

  const handleMouseEnterForImg = () => {
    setIsHoveredImg(true);
  };

  const handleMouseLeaveForImg = () => {
    setIsHoveredImg(false);
  };

  return (
    <div
      className="w-[20rem]  relative text-[1.3rem] leading-8 text-grayText flex flex-col gap-2 "
      key={title}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {itsUserPage && (
        <div
          onClick={() => {
            setShowBox((i) => !i);
          }}
          ref={boxRef}
          onMouseEnter={handleFileMouseEnter}
          onMouseLeave={handleFileMouseLeave}
          className="w-[3rem] h-[3rem]  top-3 right-3 absolute z-[50] cursor-pointer flex justify-center bg-mainColor  items-center "
        >
          <AiFillFolderOpen className="text-[2rem]  relative  bg-black  " />
          {showBox && (
            <Sent
              movieId={id}
              data={itsUserPage && data}
              shouldWeAddRemove={true}
            />
          )}
        </div>
      )}
      <Link
        to={`/display/${isItMovie}/${id}`}
        onMouseEnter={handleMouseEnterForImg}
        onMouseLeave={handleMouseLeaveForImg}
        className={`cursor-pointer relative rounded-lg   h-[26rem] bg-cover bg-center  `}
        style={{
          backgroundImage: `${
            isHoveredImg
              ? "linear-gradient(to top, rgba(0, 255, 255, 0.5) , rgba(0, 255, 255, 0.1)) ,"
              : ""
          } url(https://image.tmdb.org/t/p/original${img})`,
        }}
      ></Link>
      {!isFileHovered
        ? isHovered && (
            <MovieDetails
              img={img}
              title={title}
              releaseDate={releaseDate}
              rating={rating}
              genres={genres}
              country={country}
              isItMovie={isItMovie}
              runtime={runtime}
              voteCount={voteCount}
              description={description}
              id={id}
            />
          )
        : ""}

      <div className="flex justify-between items-center ">
        <p>{releaseDate?.slice(0, 4)}</p>
        <p
          className={`
         ${
           isHovered
             ? "text-mainColor border-mainColor"
             : "text-grayText border-grayText"
         }  rounded-lg hover:border-mainColor p-[0.3rem] border-[1px] hover:text-mainColor   `}
        >
          {isItMovie === "movie"
            ? "MOVIE"
            : `SS ${!numberOfSeasons ? "TV" : numberOfSeasons}`}
        </p>
        {runtime && <p>{runtime} min</p>}
      </div>
      <h1
        className={
          isHovered
            ? "text-mainColor text-[1.5rem]"
            : `text-[1.5rem] text-white`
        }
      >
        {title}
      </h1>
    </div>
  );
}

export default MovieCard;
