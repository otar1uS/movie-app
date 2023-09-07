import { useEffect, useState } from "react";
import { moviesProps } from "../types/TypesForUI";
import { MediaData } from "../types/TypesForComponents";

const apiKey = import.meta.env.VITE_APIKEY;

export const useApiState = ({
  query,
  itsTv,
}: {
  query: string;
  itsTv?: string;
}) => {
  const [movies, setMovies] = useState<moviesProps>([]);
  const [detailsDataCache, setDetailsDataCache] = useState<{
    [key: number]: any;
  }>({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${query}?api_key=${apiKey}`);
        const data = await response.json();

        if (data && data.results) {
          const moviesDetailsForEach = await Promise.all(
            data.results.map(async (movie: MediaData) => {
              try {
                let detailsData = detailsDataCache[movie.id];

                if (!detailsData) {
                  const detailsResponse = await fetch(
                    `https://api.themoviedb.org/3/${!itsTv ? "movie" : "tv"}/${
                      movie.id
                    }?api_key=${apiKey}`
                  );
                  detailsData = await detailsResponse.json();

                  setDetailsDataCache((prevCache) => ({
                    ...prevCache,
                    [movie.id]: detailsData,
                  }));
                }

                return {
                  ...movie,
                  detailsData: detailsData,
                };
              } catch (error) {
                console.error("Error fetching runtime:", error);
                return movie;
              }
            })
          );
          setMovies(moviesDetailsForEach);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, [query, detailsDataCache, itsTv]);

  return { movies };
};
