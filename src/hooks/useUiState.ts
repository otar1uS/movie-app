import { useContext } from "react";
import { MovieUiContext } from "../context/MovieUiContext";

export const useUiState = () => {
  const { state, dispatch } = useContext(MovieUiContext);

  if (!state) {
    throw new Error("useUiState must be used within a MovieUiProvider");
  }

  return {
    curState: state,
    dispatch,
  };
};
