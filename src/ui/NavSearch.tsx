import { RiSearchLine } from "react-icons/ri";
import { useState, useEffect } from "react";

import SearchedMovieList from "./SearchedMovieList";

type MovieSearchResult = {
  results: any[];
};

function NavSearch() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<MovieSearchResult>({ results: [] });

  useEffect(() => {
    const fetchSearchedData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${
            import.meta.env.VITE_APIKEY
          }&query=${query}` // Fix the URL by adding 'query='
        );

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error searching for movies:", error);
      }
    };
    fetchSearchedData();
  }, [query]);

  return (
    <div className="relative flex w-[14rem] md:w-[30rem] h-[4rem]">
      <input
        type="text"
        className="outline-none overflow-hidden w-full opacity-40 hover:opacity-100 focus:opacity-100 hover:bg-black focus:bg-black text-mainColor rounded-2xl text-center h-[4rem] leading-5 text-[1.6rem]"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <RiSearchLine
        size={"2rem"}
        className="absolute hidden md:block right-[-3rem] h-[4rem] text-mainColor"
      />

      {data.results?.length > 0 && (
        <SearchedMovieList searchedMovies={data.results} />
      )}
    </div>
  );
}

export default NavSearch;
