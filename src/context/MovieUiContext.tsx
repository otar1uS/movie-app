import { createContext, useReducer } from "react";
import {
  MovieCardProps,
  MovieProviderProps,
  initialStateUiProps,
  actionProps,
} from "../types/TypesForUI";

import { Toaster } from "react-hot-toast";

const initialState: initialStateUiProps = {
  whichOne: null,
  isItMovie: "movie",
  curUser: null,
  allMovies: [],
  watching: [],
  planToWatch: [],
  completed: [],
  whereToAdd: "",
  movieId: null,
};

export const MovieUiContext = createContext<{
  state: initialStateUiProps;
  dispatch: React.Dispatch<actionProps>;
}>({ state: initialState, dispatch: () => {} });

const MovieReducer = (state: initialStateUiProps, action: actionProps) => {
  const removeMovieById = (list: MovieCardProps[], movieId: number) => {
    return list.filter((movie: MovieCardProps) => movie.id !== movieId);
  };

  switch (action.type) {
    case "movie/isItMovie":
      return { ...state, isItMovie: action.payload };
    case "movie/curUser":
      return { ...state, curUser: action.payload };
    case "movie/whichOne":
      return { ...state, whichOne: action.payload };
    case "movie/allMovies":
      if (!state.allMovies.some((movie) => movie.id === action.payload.id)) {
        return {
          ...state,
          allMovies: [...state.allMovies, action.payload],
        };
      } else {
        return state;
      }

    case "movie/watching":
      if (!state.watching.some((movie) => movie.id === action.payload.id)) {
        return {
          ...state,
          watching: [...state.watching, action.payload],
        };
      } else {
        return state;
      }
    case "movie/planToWatch":
      if (!state.planToWatch.some((movie) => movie.id === action.payload.id)) {
        return {
          ...state,
          planToWatch: [...state.planToWatch, action.payload],
        };
      } else {
        return state;
      }
    case "movie/completed":
      if (!state.completed.some((movie) => movie.id === action.payload.id)) {
        return {
          ...state,
          completed: [...state.completed, action.payload],
        };
      } else {
        return state;
      }

    case "movie/removeAllMovies":
      return {
        ...state,
        allMovies: removeMovieById(state.allMovies, action.payload),
      };
    case "movie/removeWatching":
      return {
        ...state,
        watching: removeMovieById(state.watching, action.payload),
      };
    case "movie/removePlanToWatch":
      return {
        ...state,
        planToWatch: removeMovieById(state.planToWatch, action.payload),
      };
    case "movie/removeCompleted":
      return {
        ...state,
        completed: removeMovieById(state.completed, action.payload),
      };

    case "movie/whereToAdd":
      return {
        ...state,
        whereToAdd: action.payload,
      };
    case "movie/movieId":
      return {
        movieId: action.payload,
      };

    default:
      return state;
  }
};

export default function MovieUiProvider({ children }: MovieProviderProps) {
  const [state, dispatch] = useReducer(
    MovieReducer as React.Reducer<initialStateUiProps, actionProps>,
    initialState
  );

  return (
    <MovieUiContext.Provider value={{ state, dispatch }}>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              fontSize: "1.6rem",
              padding: "1rem",
              background: "green",
            },
          },
          error: {
            style: {
              fontSize: "1.6rem",
              padding: "1rem",

              background: "red",
            },
          },
        }}
      />
      {children}
    </MovieUiContext.Provider>
  );
}
