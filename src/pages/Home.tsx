import SliderForMovies from "../ui/Slider";
import { BsFire } from "react-icons/bs";

import Movies from "../ui/Movies";

function Home() {
  return (
    <div className="min-h-full  w-full ">
      <SliderForMovies isItTopSlider={true} />

      <div className=" max-w-[180rem] mx-auto  relative  mt-[-6rem]  ">
        <div className="mt-8 flex justify-center items-center absolute  top-[-3rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap   leading-5 text-[2.3rem] gap-4 text-[#cecece]">
          <BsFire />
          Trending Now
          <BsFire />
        </div>
        <SliderForMovies isItTopSlider={false} />
      </div>
      <div className=" max-w-[180rem] grid-cols-[1fr]  grid xl:grid-cols-[1fr_40rem] mx-auto   ">
        <Movies />
      </div>
    </div>
  );
}

export default Home;
