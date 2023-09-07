import { BiMenuAltRight } from "react-icons/bi";
import { PiArrowRightLight } from "react-icons/pi";
import { useUiState } from "../hooks/useUiState";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../images/movie-svgrepo-com.svg";
import { useState, useRef, useEffect } from "react";
import { auth, provider } from "../firebase/FirebaseConfig.ts";
import { signInWithPopup } from "firebase/auth";
import { User } from "../types/TypesForUI.ts";
import NavSearch from "../ui/NavSearch.tsx";

const list = [
  { text: "Home", redirect: "/" },
  { text: "User", redirect: "/user" },
];

function NavBar() {
  const { dispatch } = useUiState();
  const [user, setUser] = useState<User | null>(null);
  const [showBox, setShowBox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      dispatch({ type: "movie/curUser", payload: null });
    }
  }, [user, navigate, dispatch]);

  const boxRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setShowBox(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        dispatch({ type: "movie/curUser", payload: user.displayName });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="max-w-[180rem]   mx-auto relative">
      <div className="absolute  top-0 left-0  h-[7rem] z-10 bg-opacity-75  w-full   flex justify-between items-center px-[4rem]">
        <div className="h-full relative flex items-center gap-7">
          <BiMenuAltRight
            className="text-[#fff] w-[2rem] h-[2rem] md:w-[4rem] md:h-[4rem] rounded-2xl bg-gray-950/50 cursor-pointer hover:text-mainColor"
            onClick={() => {
              setShowBox((i) => !i);
            }}
          />
          <NavLink to={"/"}>
            <img
              src={Logo}
              alt="logo"
              className=" h-[3rem] md:h-[4rem]  text-white  inline-block text-[2.4rem] text-center rounded-2xl p-[0.3rem] 	 "
            />
          </NavLink>

          {showBox && (
            <ul
              ref={boxRef}
              className=" absolute top-[6rem]   left-0 list-none z-20 items-center justify-center py-[2rem]  rounded-lg  gap-4 bg-mainColor w-[12rem] text-[2rem]  flex flex-col  "
            >
              {list.map((menu, key) => (
                <NavLink key={key} to={menu.redirect}>
                  <div className="bg-mainColor hover:bg-black text-black rounded-2xl w-[10rem] p-3  text-[1.6rem] hover:text-mainColor   inline-block">
                    {menu.text}
                  </div>
                </NavLink>
              ))}
            </ul>
          )}
        </div>

        <NavSearch />
        {user ? (
          <div className="flex  items-center ">
            <div className="h-[3rem] max-w-full md:h-[4rem] flex gap-4 text-black bg-mainColor border-mainColor  cursor-pointer leading-5 md:leading-7 text-[1.6rem] md:text-[2rem] rounded-tl-3xl rounded-bl-3xl items-center p-[0.5rem]  border-solid  border-2 px-3 md:px-5">
              {user.photoURL ? (
                <img
                  onClick={() => navigate("user")}
                  className="w-[3rem] h-[3rem] rounded-full"
                  src={user.photoURL}
                  alt="dp"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div>No Profile Picture</div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="h-[3rem] max-w-full md:h-[4rem] flex gap-4 text-black bg-mainColor border-mainColor border-l-black  cursor-pointer leading-5 md:leading-7 text-[1.6rem] md:text-[2rem] rounded-tr-3xl rounded-br-3xl items-center p-[0.5rem]  border-solid  border-2 px-3 md:px-5 "
            >
              Logout
            </button>
          </div>
        ) : (
          <div
            onClick={handleGoogleSignIn}
            className="h-[3rem] max-w-full md:h-[4rem] flex gap-4  hover:text-black hover:bg-mainColor hover:border-mainColor  cursor-pointer leading-5 md:leading-7 text-[1.6rem] md:text-[2rem] rounded-3xl items-center p-[0.5rem] border-gray-100 border-solid  border-2 px-3 md:px-12 "
          >
            Login
            <PiArrowRightLight />
          </div>
        )}
      </div>
    </div>
  );
}
export default NavBar;
