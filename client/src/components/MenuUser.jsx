import { LuPlus } from "react-icons/lu";
import { MdLogout, MdSupportAgent } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { BiMessageDetail } from "react-icons/bi";
import { GoPaperclip } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function MenuUser() {
  const [selected, setSelected] = useState("");
  const handleLogout = () => {
    // Remove o token do localStorage e atualiza o estado
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="absolute mt-3 top-full right-0 border border-zinc-200  rounded-md shadow-sm flex flex-col gap-2 max-w-[400px] md:p-3 p-2 md:w-[280px] w-[200px] bg-white z-10">
      <div className="md:hidden text-center bg-black p-1 rounded-sm text-zinc-100 font-medium">
        <h3 className="text-sm font-medium">Vittor Fonseca Serra</h3>
      </div>
      <div className="">
        <ol className="flex flex-col gap-1 ">
          <li
            className="flex items-center gap-1"
            onClick={() => setSelected("Home")}
          >
            <Link
              className={`${
                selected === "Home"
                  ? "bg-black text-zinc-100 pl-1 pr-3 py-1 rounded-e-full"
                  : ""
              } flex items-center gap-1 font-medium`}
              to="/"
            >
              <IoHomeOutline />
              Home
            </Link>
          </li>
          <li
            className="flex items-center gap-1"
            onClick={() => setSelected("Messages")}
          >
            <Link
              className={`${
                selected === "Messages"
                  ? "bg-black text-zinc-100 pl-1 pr-3 py-1 rounded-e-full "
                  : ""
              } flex items-center gap-1 font-medium`}
              to="/messages"
            >
              <BiMessageDetail />
              Messages
            </Link>
          </li>
          <li
            className="flex items-center gap-1"
            onClick={() => setSelected("My Posts")}
          >
            <Link
              className={`${
                selected === "My Posts"
                  ? "bg-black text-zinc-100 pl-1 pr-3 py-1 rounded-e-full "
                  : ""
              } flex items-center gap-1 font-medium`}
              to="/my-posts"
            >
              <GoPaperclip />
              My Posts
            </Link>
          </li>
          <li
            className="flex items-center gap-1"
            onClick={() => setSelected("Edit Profile")}
          >
            <Link
              className={`${
                selected === "Edit Profile"
                  ? "bg-black text-zinc-100 pl-1 pr-3 py-1 rounded-e-full "
                  : ""
              } flex items-center gap-1 font-medium`}
              to="/edit/profile"
            >
              <FaRegCircleUser />
              Edit Profile
            </Link>
          </li>
          <li
            className="flex items-center gap-1"
            onClick={() => setSelected("Support")}
          >
            <Link
              className={`${
                selected === "Support"
                  ? "bg-black text-zinc-100 pl-1 pr-3 py-1 rounded-e-full "
                  : ""
              } flex items-center gap-1 font-medium`}
              to="/support"
            >
              <MdSupportAgent />
              Support
            </Link>
          </li>
          <li
            className="flex items-center gap-1"
            onClick={() => setSelected("Feedback")}
          >
            <Link
              className={`${
                selected === "Feedback"
                  ? "bg-black text-zinc-100 pl-1 pr-3 py-1 rounded-e-full "
                  : ""
              } flex items-center gap-1 font-medium`}
              to="/feedback"
            >
              <AiOutlineLike />
              Feedback
            </Link>
          </li>
        </ol>
      </div>
      <div className="flex justify-between items-center flex-wrap md:gap-1.5 gap-1">
        <button className="px-3 py-1 rounded-md bg-black font-bold text-zinc-100 flex-grow flex justify-center items-center gap-1">
          <LuPlus />
          New Post(5)
        </button>
        <button
          className="md:flex-grow-0 flex-grow px-3 py-1 rounded-md bg-red-500 font-bold text-zinc-100 flex justify-center items-center gap-1"
          onClick={handleLogout}
        >
          <MdLogout />
          Logout
        </button>
      </div>
    </div>
  );
}
