import footerPhoto from "../images/footer.jpg";
import { NavLink } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
function Footer() {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to top, #06060688 100%, rgba(255, 255, 255, 0) 100%) ,url(${footerPhoto})`,
      }}
      className="w-full h-[20rem] gap-4 mt-[5rem] text-[1.8rem] flex-col flex justify-center items-center text-mainColor "
    >
      <h1 className="uppercase">Sit back, relax and enjoy the show </h1>
      <NavLink
        to={"/"}
        className="text-grayText hover:text-mainColor flex items-center gap-2 cursor-pointer"
      >
        HOME <AiOutlineArrowRight />
      </NavLink>
    </div>
  );
}

export default Footer;
