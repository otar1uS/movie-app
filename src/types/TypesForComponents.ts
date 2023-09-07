export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

export interface Media {
  adult: boolean;
  backdrop_path: string | null;
  budget?: number; // Budget is specific to movies
  belongs_to_collection?: unknown | null; // Belongs to collection is specific to movies
  created_by?: unknown[]; // Created by is specific to TV shows
  episode_run_time?: number[] | undefined; // Episode run time is specific to TV shows
  first_air_date?: string; // First air date is specific to TV shows
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id?: string; // IMDB ID is specific to movies
  in_production?: boolean; // In production is specific to TV shows
  languages?: string[]; // Languages is specific to TV shows
  last_air_date?: string; // Last air date is specific to TV shows
  last_episode_to_air?: Episode | null; // Last episode to air is specific to TV shows
  name?: string; // Name is specific to TV shows
  next_episode_to_air?: Episode | null; // Next episode to air is specific to TV shows
  networks?: unknown[]; // Networks is specific to TV shows
  number_of_episodes?: number; // Number of episodes is specific to TV shows
  number_of_seasons?: number; // Number of seasons is specific to TV shows
  origin_country?: string[]; // Origin country is specific to TV shows
  original_language: string;
  original_title: string; // Original title is specific to movies
  original_name?: string; // Original name is specific to TV shows
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: unknown[];
  production_countries: ProductionCountry[];
  release_date?: string; // Release date is specific to movies
  revenue?: number; // Revenue is specific to movies
  runtime?: number; // Runtime is specific to movies
  seasons?: Season[]; // Seasons is specific to TV shows
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title?: string; // Title is specific to movies
  type?: string; // Type is specific to TV shows
  video?: boolean; // Video is specific to movies
  vote_average: number;
  vote_count: number;
}
export interface MediaData {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  detailsData: Media;
}
