import pageNotFoundImg from "../images/000-404.png";
import { BiRightArrow } from "react-icons/bi";
import { NavLink } from "react-router-dom";

function DefaultPage({ itsUserPageCase }: { itsUserPageCase?: boolean }) {
  return (
    <div className=" text-[2.4rem] md:text-[3rem] flex-col gap-10   flex h-screen w-full text-mainColor justify-center items-center">
      <NavLink
        className="flex items-center opacity-70 scale-100 hover:opacity-100 hover:scale-125 cursor-pointer gap-2"
        to="/"
      >
        {itsUserPageCase ? (
          <>
            You have to register first to use this feature. GO BACK{" "}
            <BiRightArrow />
          </>
        ) : (
          <>
            GO BACK <BiRightArrow />
          </>
        )}
      </NavLink>
      <img
        src={pageNotFoundImg}
        alt="page not found"
        className="max-w-[70rem]"
      />
    </div>
  );
}

export default DefaultPage;
