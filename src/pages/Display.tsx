import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Genre, Media, ProductionCountry } from "../types/TypesForComponents";
import { AiFillStar } from "react-icons/ai";
import StarRatings from "../ui/StartRatings";
import ReactPlayer from "react-player";

const apiKey = import.meta.env.VITE_APIKEY;
const basePosterURL = `https://image.tmdb.org/t/p/original`;

function Display() {
  const [data, setData] = useState<Media | []>([]);
  const { isItMovie, id } = useParams<{ isItMovie: string; id: string }>();

  const [trailerKey, setTrailerKey] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const fetching = await fetch(
        `https://api.themoviedb.org/3/${isItMovie}/${id}?api_key=${apiKey}`
      );
      const data = await fetching.json();
      setData(data);
      const trailerFetching = await fetch(
        `https://api.themoviedb.org/3/${isItMovie}/${id}/videos?api_key=${apiKey}`
      );
      const trailerData = await trailerFetching.json();
      const firstTrailer = trailerData.results.find(
        (video: any) => video.site === "YouTube" && video.type === "Trailer"
      );
      if (firstTrailer) {
        setTrailerKey(firstTrailer.key);
      }
    };
    fetchData();
  }, [isItMovie, id]);

  const {
    name,
    genres,
    poster_path,
    title,
    vote_average,
    vote_count,
    production_countries,
    release_date,
    runtime,
    overview,
    production_companies,
    backdrop_path,
    first_air_date,
    episode_run_time,
  } = data as Media;

  return (
    <div className="min-h-screen pt-[8rem]">
      {trailerKey && (
        <div
          className="flex justify-center items-center bg-cover bg-center w-full h-screen"
          style={{
            backgroundImage: `linear-gradient(to top, #06060688 30%, rgba(255, 255, 255, 0) 100%), url(${basePosterURL}${backdrop_path})`,
          }}
        >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerKey}`}
            width="80%"
            height="70%"
            controls
          />
        </div>
      )}
      <div className="container mx-auto mt-[10rem] px-4">
        <div className="flex">
          <div className="w-1/4">
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={`${title || name} Poster`} // Use title or name for alt text
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="w-2/3 pl-8">
            <div className="w-full flex justify-between mb-5">
              <div>
                <h1 className="text-[2rem] 2xl:text-[3.8rem] leading-8 mb-10">
                  {title || name}
                </h1>
                <div className="pb-[1rem] align-center justify-start items-center sm:text-[1.5rem] text-[1.3rem] leading-5 text-[#dedede] flex gap-[1rem]">
                  <p>
                    {release_date
                      ? release_date?.slice(0, 4)
                      : first_air_date?.slice(0, 4)}
                  </p>
                  <p>{runtime ? runtime : episode_run_time}min</p>

                  <p className="flex items-center gap-1">
                    <AiFillStar /> {vote_average?.toFixed(1)}
                  </p>
                </div>
              </div>
              <StarRatings votes={vote_average} count={vote_count} />
            </div>
            <p className="text-grayText text-[1.5rem] leading-7 mb-5">
              {overview}
            </p>
            <p className="text-[#ededed] text-[1.5rem] leading-7 mb-5">
              <span className="text-grayText">Type: </span>
              {isItMovie?.toUpperCase()}
            </p>
            <p className="text-[#ededed] text-[1.5rem] leading-7 mb-5">
              <span className="text-grayText">Country: </span>
              {production_countries
                ? production_countries
                    .map((country: ProductionCountry) => country.name)
                    .join(", ")
                : "Unknown"}
            </p>
            <p className="text-[#ededed] text-[1.5rem] leading-7 mb-5">
              <span className="text-grayText">Genres: </span>
              {genres
                ? genres.map((genre: Genre) => genre.name).join(", ")
                : "Unknown"}
            </p>
            {production_companies && (
              <p className="text-[#ededed] text-[1.5rem] leading-7 mb-5">
                <span className="text-grayText">Production: </span>
                {production_companies
                  ? production_companies
                      .slice(0, 3)
                      .map((company) => company?.name)
                      .join(", ")
                  : ""}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Display;
