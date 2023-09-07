import Slider from "react-slick";
import { AiFillStar } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { BsArrowUpRightCircle } from "react-icons/bs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { genreProps } from "../types/TypesForUI.ts";
import { useApiState } from "../hooks/useApiState.ts";
import Sent from "../ui/Sent";
import { useUiState } from "../hooks/useUiState.ts";
import { toast } from "react-hot-toast";

function SliderForMovies({ isItTopSlider }: { isItTopSlider: boolean }) {
  const [showBox, setShowBox] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [movieGenres, setMovieGenres] = useState<genreProps[]>();
  const { curState } = useUiState();
  const navigate = useNavigate();

  //! fetching popular movies  data

  const { movies } = useApiState({
    query: "https://api.themoviedb.org/3/trending/movie/day",
  });

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_APIKEY}`
      );
      const data = await response.json();

      setMovieGenres(data.genres);
    };

    fetchMovies();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const basePosterURL = `https://image.tmdb.org/t/p/original`;

  const getSlidesToShow = () => {
    if (isItTopSlider) {
      return 1;
    } else if (screenSize < 800) {
      return 1;
    } else if (screenSize < 1000) {
      return 2;
    } else if (screenSize < 1300) {
      return 3;
    } else {
      return 4;
    }
  };

  const getSlidesToScroll = () => {
    if (isItTopSlider || screenSize < 650) {
      return 1;
    } else {
      return 2;
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: getSlidesToScroll(),
    autoplay: true,
    dotsClass: isItTopSlider ? "slick-dots" : "slick-dots-secondary",
    autoplaySpeed: isItTopSlider ? 5000 : 10000,
    arrows: true,
  };

  // ! we are creating new data with genres bc existing one does not have  it
  const finalData = movies?.map((movie) => {
    const genres = movie.genre_ids.map(
      (id: number) =>
        movieGenres?.find((genre: genreProps) => genre.id === id)?.name
    );

    return {
      ...movie,
      genres,
    };
  });

  return (
    <div className="w-full">
      <Slider {...carouselSettings}>
        {isItTopSlider
          ? finalData?.slice(0, 10).map((movie) => (
              <div key={movie.title}>
                <div
                  key={movie.id}
                  className=" cursor-pointer  flex justify-center items-end bg-cover  bg-center  min-h-[78rem]"
                  style={{
                    backgroundImage: `linear-gradient(to top, #06060688 30%, rgba(255, 255, 255, 0) 100%), url(${basePosterURL}${movie?.backdrop_path})`,
                    paddingBottom: "3rem",
                  }}
                >
                  <div className="flex  flex-col mb-[8rem] text-[#cdcdcd] gap-[2.5rem]  ">
                    <h1
                      className={`text-[#e9e9e9]  text-center  text-[1.6rem] md:text-[3rem] leading-5 sm:leading-[4.5rem] lg:text-[4.1rem] whitespace-nowrap font-[600] uppercase `}
                    >
                      {movie.title}
                    </h1>
                    <div className="flex  justify-center gap-8 font-medium">
                      <p className="flex items-center  gap-1  text-[1.3rem] leading-5  sm:text-[1.5rem] ">
                        <AiFillStar /> {movie.vote_average.toFixed(1)}
                      </p>
                      <p className=" text-[1.3rem] leading-5  sm:text-[1.5rem]">
                        {movie.release_date?.slice(0, 4)}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-[3rem]  sm:pmx-0 sm:gap-[5rem]">
                      <Button
                        playIcon={true}
                        onClick={() => {
                          navigate(`display/movie/${movie.id}`);
                        }}
                        styles={
                          "flex  items-center gap-2 leading-5 sm:leading-7  opacity-90 rounded-2xl hover:opacity-100 justify-center text-[1.6rem] font-semibold sm:text-[1.8rem] bg-mainColor w-[22rem] md:w-[15rem] h-[5.5rem]  text-black "
                        }
                      >
                        Watch Now
                      </Button>
                      <div
                        onClick={() => {
                          curState.curUser
                            ? setShowBox((i) => !i)
                            : toast.error("Please login to use this feature");
                        }}
                        ref={boxRef}
                        className="  flex relative justify-center items-center  text-[1.6rem] font-semibold sm:text-[1.8rem] gap-4 text-[#ccc9c9] hover:text-mainColor"
                      >
                        <BsBookmark className="h-[1.8rem] leading-5 sm:leading-7 w-[1.4rem]" />
                        Bookmark
                        {showBox && <Sent />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : finalData?.map((movie, i: number) => (
              <div key={i}>
                <Link
                  to={`display/movie/${movie.id}`}
                  key={movie.vote_average}
                  className=" relative cursor-pointer     flex justify-start items-end  rounded-2xl   bg-cover  bg-top  h-[22.5rem] lg:max-w-[41rem] min-w-[41rem]"
                  style={{
                    backgroundImage: ` url(${basePosterURL}${movie?.poster_path})`,
                    marginTop: "2rem",
                    marginBottom: "2rem",
                    paddingBottom: "1.5rem",
                    paddingLeft: "2rem",
                  }}
                >
                  <BsArrowUpRightCircle
                    size={"2rem"}
                    className="text-white absolute top-2 right-2 "
                  />
                  <div className="flex justify-end  flex-col   gap-[1rem]  ">
                    <h1 className="text-[#e9e9e9] whitespace-pre-line text-start     text-[2rem]  leading-10   font-[600] uppercase ">
                      {movie.title}
                    </h1>
                    <div className="flex  justify-start gap-8 font-semibold text-[1.2rem]   ">
                      {movie.genres?.map((genre, i) => (
                        <p key={i} className="text-[#00acc1]">
                          {genre}
                        </p>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
      </Slider>
    </div>
  );
}
export default SliderForMovies;
