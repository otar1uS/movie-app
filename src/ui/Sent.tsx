import { useUiState } from "../hooks/useUiState";

import { sentProps } from "../types/TypesForUI";
import { toast } from "react-hot-toast";
import { MdCancel } from "react-icons/md";

function Sent({ data, shouldWeAddRemove, movieId }: sentProps) {
  const { curState, dispatch } = useUiState();

  const removeMovieHandler = () => {
    switch (curState.whichOne) {
      case "all":
        return dispatch({
          type: "movie/removeAllMovies",
          payload: movieId,
        });
      case "watching":
        return dispatch({
          type: "movie/removeWatching",
          payload: movieId,
        });

      case "planToWatch":
        return dispatch({
          type: "movie/removePlanToWatch",
          payload: movieId,
        });
      case "completed":
        return dispatch({
          type: "movie/removeCompleted",
          payload: movieId,
        });
    }
  };

  const whereToSentHandler = () => {
    if (
      curState.whereToAdd === "completed" ||
      curState.whereToAdd === "planToWatch" ||
      curState.whereToAdd === "watching"
    ) {
      dispatch({
        type: "movie/allMovies",
        payload: data,
      });
    }

    switch (curState.whereToAdd) {
      case "watching":
        return dispatch({
          type: "movie/watching",
          payload: data,
        });

      case "planToWatch":
        return dispatch({
          type: "movie/planToWatch",
          payload: data,
        });
      case "completed":
        return dispatch({
          type: "movie/completed",
          payload: data,
        });
    }
  };

  const texts = ["Watching", "Plan to Watch", "Completed"];
  return (
    <div
      className={`absolute w-[14rem] py-[1rem] "hover:text-mainColor p-[0.3rem] hover:bg-black  ${
        shouldWeAddRemove ? "top-[-12rem]" : "top-[-9rem]"
      }   z-[250]  text-[1.2rem] rounded-2xl text-grayText bg-[#242424]`}
    >
      {texts.map((text: string, i: number) => (
        <p
          className="hover:text-mainColor p-[0.3rem] hover:bg-black w-full"
          key={i}
          onClick={() => {
            dispatch({
              type: "movie/whereToAdd",
              payload:
                text == texts[0]
                  ? "watching"
                  : text == texts[1]
                  ? "planToWatch"
                  : "completed",
            });
            whereToSentHandler();
            toast.success(
              `${data?.title} successfully added to ${text} category`
            );
          }}
        >
          {text}
        </p>
      ))}
      {shouldWeAddRemove && (
        <p
          onClick={removeMovieHandler}
          className="hover:text-[red]  flex items-center gap-5   p-[0.3rem] hover:bg-mainColor  w-full"
        >
          <MdCancel /> Remove{" "}
        </p>
      )}
    </div>
  );
}

export default Sent;
