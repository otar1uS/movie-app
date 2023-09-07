import { BsFillFilePlayFill } from "react-icons/bs";
import { useUiState } from "../hooks/useUiState";
import { BsBookmarks } from "react-icons/bs";
import { HiOutlineFolder } from "react-icons/hi";
import MovieCard from "../ui/MovieCard";
import { useState, useEffect } from "react";
import { MovieCardProps } from "../types/TypesForUI";
import DefaultPage from "./DefaultPage";

function User() {
  const { curState, dispatch } = useUiState();
  const [whichOne, setWhichOne] = useState("all");

  useEffect(() => {
    dispatch({ type: "movie/whichOne", payload: whichOne });
  }, [dispatch, whichOne]);

  const options = [
    { text: "All", value: "all" },
    { text: "Watching", value: "watching" },
    { text: "Plan to Watch", value: "planToWatch" },
    { text: "Completed", value: "completed" },
  ];

  const whichArrayShouldBeFetched = () => {
    switch (whichOne) {
      case "all":
        return curState.allMovies;
      case "watching":
        return curState.watching;
      case "planToWatch":
        return curState.planToWatch;
      case "completed":
        return curState.completed;
      default:
        return [];
    }
  };

  const resultArray = whichArrayShouldBeFetched();

  if (!curState.curUser) {
    return <DefaultPage itsUserPageCase={true} />;
  }

  return (
    <div className="w-full min-h-screen ">
      <div className="container mx-auto flex justify-start pt-[12rem]  text-[2rem] md:text-[2.4rem] items-center gap-4 ">
        <BsFillFilePlayFill className="text-mainColor " />
        <h1>Hi {curState.curUser}</h1>
        <div className="flex justify-center items-center  text-[1.6rem] gap-4 text-mainColor border-[1px] border-mainColor rounded-2xl  p-2 ">
          <BsBookmarks className="h-[1.8rem] leading-5 sm:leading-7 w-[1.4rem]" />
          Bookmark
        </div>
        <div className=" ml-[4rem] flex gap-5 text-[1.6rem] items-center text-grayText">
          {options.map((option, index) => (
            <p
              key={index}
              className={`hover:text-white cursor-pointer flex items-center  ${
                option.value === whichOne ? "text-white" : ""
              }`}
              onClick={() => setWhichOne(option.value)}
            >
              {option.text} /
            </p>
          ))}
          <HiOutlineFolder size={16} />
        </div>
      </div>
      <div className=" container mx-auto flex flex-wrap gap-6 mt-[6rem]">
        {resultArray
          ? resultArray.map((movie: MovieCardProps) => (
              <div key={movie?.id}>
                <MovieCard
                  itsUserPage={true}
                  id={movie.id}
                  title={movie.title}
                  releaseDate={movie.releaseDate}
                  rating={movie.rating}
                  genres={movie.genres}
                  country={movie.country}
                  img={movie.img}
                  isItMovie={movie.isItMovie}
                  runtime={movie.runtime}
                  voteCount={movie.voteCount}
                  description={movie.description}
                  numberOfSeasons={movie.numberOfSeasons}
                />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default User;
