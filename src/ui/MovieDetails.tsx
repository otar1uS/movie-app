import { AiFillStar } from "react-icons/ai";
import { BsPlusCircleDotted as AddIcon } from "react-icons/bs";
import { Genre, ProductionCountry } from "../types/TypesForComponents";
import Button from "./Button";
import { MovieCardProps } from "../types/TypesForUI";
import { useState } from "react";
import Sent from "../ui/Sent";
import { useUiState } from "../hooks/useUiState";
import { toast } from "react-hot-toast";

function MovieDetails({
  img,
  title,
  releaseDate,
  rating,
  genres,
  country,
  isItMovie,
  runtime,
  voteCount,
  description,
  id,
  isItTopMovies,
}: MovieCardProps) {
  const [showBox, setShowBox] = useState(false);
  const { curState } = useUiState();

  const data = {
    img,
    title,
    releaseDate,
    rating,
    genres,
    country,
    isItMovie,
    runtime,
    voteCount,
    description,
    id,
  };

  return (
    <div
      className={`absolute rounded-2xl z-[200] min-w-[35rem]  p-[2rem] top-[30%] bg-black ${
        isItTopMovies ? "left-[12%]" : "left-[100%]"
      }  flex flex-col gap-[1rem] justify-center items-start`}
    >
      <div className="relative  w-full  ">
        <h1 className="leading-[2.7rem] w-[25rem]  flex flex-wrap lg:text-[2.4rem] md:text-[1.8rem]  sm:text-[2rem] text-white">
          {title}
        </h1>
        <div className="absolute top-3 right-2 cursor-pointer hover:text-mainColor">
          <AddIcon
            size="2.5rem"
            className="  "
            onClick={() => {
              curState.curUser
                ? setShowBox((i) => !i)
                : toast.error("Please login to use this feature");
            }}
          />
          {showBox && <Sent data={data} />}
        </div>
      </div>

      <div className="border-b-[1px] pb-[1rem] w-full align-center justify-start items-center border-grayText sm:text-[1.5rem] text-[1.3rem] leading-5 text-mainColor flex gap-[1rem] ">
        <p>{releaseDate?.slice(0, 4)}</p>
        <p>{runtime}min</p>

        <p className="flex items-center  gap-1">
          <AiFillStar /> {rating.toFixed(1)}
        </p>
      </div>
      <div>
        <p className="flex">
          Country:
          {country?.slice(0, 3).map((c: ProductionCountry, index: number) => (
            <span className="flex pl-[0.3rem]  text-[#ffffffbf]" key={c.name}>
              {c.name}
              {index < country.slice(0, 3).length - 1 && ", "}
            </span>
          ))}
        </p>
        <p className="flex">
          Genre:
          {genres?.slice(0, 3).map((g: Genre, index: number) => (
            <span className="flex pl-[0.3rem]  text-[#ffffffbf]" key={g.name}>
              {g.name}
              {index < genres.slice(0, 3).length - 1 && ", "}
            </span>
          ))}
        </p>
        <p className="flex flex-wrap">
          Scores: {rating} by {voteCount}
        </p>
      </div>
      <p>{description.slice(0, 120)}...</p>

      <Button
        playIcon={true}
        onClick={() => {}}
        styles={
          "flex  items-center gap-2 leading-5 sm:leading-7  opacity-90 rounded-2xl hover:opacity-100 justify-center text-[1.6rem] font-semibold sm:text-[1.8rem] bg-mainColor w-full h-[5.5rem]  text-black "
        }
      >
        Watch Now
      </Button>
    </div>
  );
}
export default MovieDetails;
