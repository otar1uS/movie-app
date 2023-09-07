import { useState } from "react";
import { BiSolidStar } from "react-icons/bi";
import { useUiState } from "../hooks/useUiState";
import { toast } from "react-hot-toast";
function StartRatings({ votes, count }: { votes: number; count: number }) {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const { curState } = useUiState();
  const value = ["horrible", "bad", "normal", "good", "Masterpiece"];

  return (
    <div className=" w-[13rem] md:w-[16rem] h-[7rem] flex flex-col bg-black rounded-2xl justify-center items-center ">
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => {
          const currentRating = i + 1;
          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => {
                  if (!curState.curUser) {
                    return toast.error("You must Login first to rate it");
                  }
                  setRating(currentRating);
                }}
                className="hidden "
              />
              <BiSolidStar
                color={
                  currentRating <=
                  (hover !== null ? hover : rating !== null ? rating : 0)
                    ? "#00ACC1"
                    : "#ededed"
                }
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
                className="cursor-pointer text-[2rem]  md:text-[2.5rem] "
              />
            </label>
          );
        })}
      </div>
      <p className="text-[1.3rem] text-grayText flex leading-5">
        {rating !== null
          ? value[rating - 1].toUpperCase()
          : hover !== null
          ? value[hover - 1].toUpperCase()
          : `${votes} of 10 (${count} reviews)`}
      </p>
    </div>
  );
}

export default StartRatings;
