import { ReactNode, MouseEventHandler } from "react";
import { MediaData, Genre, ProductionCountry } from "./TypesForComponents";

export interface ButtonProps {
  playIcon: boolean;
  styles?: string | undefined;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export type actionProps =
  | { type: "movie/isItMovie"; payload: any }
  | { type: "movie/curUser"; payload: string | null }
  | { type: "movie/whichOne"; payload: string | null }
  | { type: "movie/allMovies"; payload: MovieCardProps }
  | { type: "movie/watching"; payload: MovieCardProps }
  | { type: "movie/planToWatch"; payload: MovieCardProps }
  | { type: "movie/completed"; payload: MovieCardProps }
  | { type: "movie/removeAllMovies"; payload: number }
  | { type: "movie/removeWatching"; payload: number }
  | { type: "movie/removePlanToWatch"; payload: number }
  | { type: "movie/removeCompleted"; payload: number }
  | { type: "movie/whereToAdd"; payload: string | null }
  | { type: "movie/movieId"; payload: number | null };

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface MovieCardProps {
  itsUserPage?: boolean;
  isItTopMovies?: boolean;
  title: string | undefined;
  releaseDate: string | undefined;
  rating: number;
  genres: Genre[];
  country: ProductionCountry[];
  number?: number;
  img?: string | null;
  isItMovie: string;
  runtime: number | undefined | number[];
  voteCount: number;
  description: string;
  numberOfSeasons?: number | undefined;
  id?: number;
}

export interface MovieProviderProps {
  children: ReactNode;
}
export interface genreProps {
  id: number;
  name: string;
}
export type moviesProps = MediaData[];

export interface initialStateUiProps {
  whichOne: null | string;
  isItMovie: string;
  curUser: null | string;
  allMovies: MovieCardProps[];
  watching: MovieCardProps[];
  planToWatch: MovieCardProps[];
  completed: MovieCardProps[];
  whereToAdd: null | string;
  movieId: null | number;
}

export interface genreProps {
  id: number;
  genres: string[];
}

export interface sentProps {
  movieId?: number | undefined;

  data?: MovieCardProps;
  shouldWeAddRemove?: boolean;
}
