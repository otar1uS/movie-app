import { useState } from "react";
import MovieCard from "./MovieCard";
import { BsFillFilePlayFill } from "react-icons/bs";
import AdsPicture from "../images/addsPicture.jpg";
import { MediaData } from "../types/TypesForComponents.ts";

import Button from "./Button.tsx";
import { useApiState } from "../hooks/useApiState.ts";
import TopMovies from "./TopMovies.tsx";

function Movies() {
  const [curState, setState] = useState("movie");
  const [curStateOfTop, setStateOfTop] = useState("day");

  const { movies: data } = useApiState({
    query: `https://api.themoviedb.org/3/${curState}/popular`,
    itsTv: curState == "tv" ? "tv" : undefined,
  });
  const { movies: latestMovies } = useApiState({
    query: `https://api.themoviedb.org/3/movie/now_playing`,
  });
  const { movies: latestSeries } = useApiState({
    query: `https://api.themoviedb.org/3/tv/on_the_air`,
    itsTv: "tv",
  });
  const { movies: topMovies } = useApiState({
    query: `https://api.themoviedb.org/3/trending/movie/${curStateOfTop}`,
  });

  return (
    <>
      <div className="grid  grid-rows-[repeat(3,auto)] gap-[25rem] mt-[10rem]">
        <div>
          <div className="flex justify-start items-center gap-[1rem]  text-[1.6rem] md:text-[2rem] mb-[1rem] ">
            <BsFillFilePlayFill className="text-mainColor " />
            <h1 className="leading-[2.3rem] sm:leading-[3rem] md:text-[2.5rem] ">
              RECOMMENDED
            </h1>
            <Button
              playIcon={false}
              onClick={() => setState("movie")}
              styles={`${
                curState == "movie"
                  ? "text-mainColor border-mainColor"
                  : "text-grayText border-grayText"
              }  rounded-2xl hover:border-mainColor w-[9rem] p-[0.7rem] border-[1px] hover:text-mainColor  cursor-pointer text-[1.4rem] leading-8`}
            >
              MOVIES
            </Button>
            <Button
              playIcon={false}
              onClick={() => setState("tv")}
              styles={`${
                curState == "tv"
                  ? "text-mainColor border-mainColor"
                  : "text-grayText border-grayText"
              }  rounded-2xl hover:border-mainColor w-[9rem] p-[0.7rem] border-[1px] hover:text-mainColor  cursor-pointer text-[1.4rem] leading-8`}
            >
              TV SHOWS
            </Button>
          </div>
          <div className="flex flex-wrap gap-6 justify-center ">
            {data.slice(0, 18)?.map((movie: MediaData) => (
              <div key={movie?.id}>
                <MovieCard
                  id={movie.id}
                  title={curState == "movie" ? movie.title : movie.name}
                  releaseDate={
                    curState == "movie"
                      ? movie.release_date
                      : movie.first_air_date
                  }
                  rating={movie.vote_average}
                  genres={movie.detailsData.genres}
                  country={movie.detailsData.production_countries}
                  img={movie.poster_path}
                  isItMovie={curState == "movie" ? "movie" : "tv"}
                  runtime={
                    curState == "movie"
                      ? movie.detailsData.runtime
                      : movie.detailsData.episode_run_time
                  }
                  voteCount={movie.vote_count}
                  description={movie.overview}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img
            src={AdsPicture}
            className="absolute w-[100rem] h-[13rem] left-20 top-[-18rem]"
            alt="add"
          />
          <div className="flex justify-start items-center gap-[1rem] text-[2rem] mb-[1rem]">
            <BsFillFilePlayFill className="text-mainColor " />
            <h1 className="leading-[2.3rem] sm:leading-[3rem] md:text-[2.5rem] ">
              LATEST MOVIES
            </h1>
          </div>
          <div className="flex flex-wrap gap-6 justify-center ">
            {latestMovies.slice(0, 12)?.map((movie) => (
              <div key={movie.id}>
                <MovieCard
                  id={movie.id}
                  title={curState == "movie" ? movie.title : movie.name}
                  releaseDate={
                    curState == "movie"
                      ? movie.release_date
                      : movie.first_air_date
                  }
                  rating={movie.vote_average}
                  genres={movie.detailsData.genres}
                  country={movie.detailsData.production_countries}
                  img={movie.poster_path}
                  isItMovie={curState}
                  runtime={
                    curState == "movie"
                      ? movie.detailsData.runtime
                      : movie.detailsData.episode_run_time
                  }
                  voteCount={movie.vote_count}
                  description={movie.overview}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img
            src={AdsPicture}
            className="absolute w-[100rem] h-[13rem] left-20 top-[-18rem]"
            alt="add"
          />
          <div className="flex justify-start items-center gap-[1rem] text-[2rem] mb-[1rem]">
            <BsFillFilePlayFill className="text-mainColor " />
            <h1 className="leading-[2.3rem] sm:leading-[3rem] md:text-[2.5rem] ">
              LATEST TV SHOWS
            </h1>
          </div>
          <div className="flex flex-wrap gap-6 justify-center ">
            {latestSeries.slice(0, 12)?.map((movie) => (
              <div key={movie.id}>
                <MovieCard
                  id={movie.id}
                  title={movie.name}
                  releaseDate={movie.first_air_date}
                  rating={movie.vote_average}
                  genres={movie.detailsData.genres}
                  country={movie.detailsData.production_countries}
                  img={movie.poster_path}
                  isItMovie={"tv"}
                  runtime={movie.detailsData.episode_run_time}
                  voteCount={movie.vote_count}
                  description={movie.overview}
                  numberOfSeasons={movie.detailsData.number_of_seasons}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* //!TOP 9 showcase */}

      <div className=" mt-[10rem] w-[60%]  xl:w-full mx-auto xl:mx-0 xl:mt-0">
        <div className="flex justify-start items-center gap-[1rem] text-[2rem] mb-[1rem] ">
          <BsFillFilePlayFill className="text-mainColor " />
          <h1 className="leading-[2.3rem] sm:leading-[3rem] md:text-[2.5rem] ">
            TOP9
          </h1>
          <Button
            playIcon={false}
            onClick={() => setStateOfTop("day")}
            styles={`${
              curStateOfTop == "day"
                ? "text-mainColor border-mainColor"
                : "text-grayText border-grayText"
            }  rounded-2xl hover:border-mainColor w-[9rem] p-[0.7rem] border-[1px] hover:text-mainColor  cursor-pointer text-[1.4rem] leading-8`}
          >
            Day
          </Button>
          <Button
            playIcon={false}
            onClick={() => setStateOfTop("week")}
            styles={`${
              curStateOfTop == "week"
                ? "text-mainColor border-mainColor"
                : "text-grayText border-grayText"
            }  rounded-2xl hover:border-mainColor w-[9rem] p-[0.7rem] border-[1px] hover:text-mainColor  cursor-pointer text-[1.4rem] leading-8`}
          >
            Week
          </Button>
        </div>
        <div className="flex  flex-col w-full gap-4 h-[67rem]  ">
          {topMovies.slice(0, 9)?.map((movie, i) => (
            <div key={movie.id}>
              <TopMovies
                id={movie.id}
                number={i}
                title={movie.title}
                releaseDate={movie.release_date}
                rating={movie.vote_average}
                genres={movie.detailsData.genres}
                country={movie.detailsData.production_countries}
                img={movie.poster_path}
                runtime={movie.detailsData.runtime}
                voteCount={movie.vote_count}
                description={movie.overview}
                isItMovie={curState}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Movies;
