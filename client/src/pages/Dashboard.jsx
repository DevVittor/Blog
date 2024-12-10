import { Helmet, HelmetProvider } from "react-helmet-async";
import { RxDashboard } from "react-icons/rx";
import {
  IoCalendarNumberOutline,
  IoWallet,
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { FaBoxOpen, FaClipboardList } from "react-icons/fa6";
import { FaUsers, FaUser } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { BsQuestionLg } from "react-icons/bs";
import CreatePost from "./user/CreatePost";
import Found from "./Found";
import { useState } from "react";
import Settings from "../components/Settings";
import HelpCenter from "../components/HelpCenter";
export default function Dashboard() {
  const [optionList, setOptionList] = useState("");

  // Função para renderizar o conteúdo com base no estado `optionList`
  const renderContent = () => {
    switch (optionList) {
      case "create Post":
        return <CreatePost />;
      case "settings":
        return <Settings />;
      case "help center":
        return <HelpCenter />;
      default:
        return <Found />;
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Tenha acesso a sua dashboard" />
      </Helmet>
      <div className="flex flex-grow">
        <div className="flex flex-col justify-between gap-3 px-3 py-5 w-[300px] flex-shrink-0 border-r border-zinc-200">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1">
              <RxDashboard />
              <h2>Dashboard</h2>
            </div>
            <hr />
            <div className="flex flex-col gap-3">
              <h3>Team Management</h3>
              <ol className="flex flex-col gap-1.5">
                <li className="flex items-center gap-1.5">
                  <FaUsers />
                  Usuários
                </li>
                <li className="flex items-center gap-1.5">
                  <IoCalendarNumberOutline />
                  Posts
                </li>
                <li className="flex items-center gap-1.5">
                  <FaUser />
                  Personal details
                </li>
                <li className="flex items-center gap-1.5">
                  <FaBoxOpen />
                  Products
                </li>
              </ol>
            </div>
            <hr />
            <div className="flex flex-col gap-3">
              <h3>Post</h3>
              <ol className="flex flex-col gap-1.5">
                <li className="flex items-center gap-1.5">
                  <CiViewList />
                  My Posts
                </li>
                <li
                  className={`${
                    optionList === "create Post"
                      ? "border border-zinc-200 rounded-full shadow-sm bg-zinc-50 px-3 py-1"
                      : "flex items-center gap-1.5 hover:cursor-pointer bg-white"
                  } flex items-center gap-1.5 hover:cursor-pointer`}
                  onClick={() => setOptionList("create Post")}
                >
                  <FaClipboardList />
                  Create Post
                </li>
                <li className="flex items-center gap-1.5">
                  <IoWallet />
                  Edit Post
                </li>
                <li className="flex items-center gap-1.5">
                  <IoWallet />
                  Delete Post
                </li>
              </ol>
            </div>
            <hr />
            <div className="flex flex-col gap-3">
              <h3>Finances</h3>
              <ol className="flex flex-col gap-1.5">
                <li className="flex items-center gap-1.5">
                  <CiViewList />
                  Payroll
                </li>
                <li className="flex items-center gap-1.5">
                  <FaClipboardList />
                  Invoices
                </li>
                <li className="flex items-center gap-1.5">
                  <IoWallet />
                  Billing
                </li>
              </ol>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <ol className="flex flex-col gap-1.5">
              <li
                className="flex items-center gap-1 hover:cursor-pointer"
                onClick={() => setOptionList("settings")}
              >
                <IoSettingsOutline />
                Settings
              </li>
              <li
                className="flex items-center gap-1 hover:cursor-pointer"
                onClick={() => setOptionList("help center")}
              >
                <BsQuestionLg />
                Help Center
              </li>
              <li className="flex items-center gap-1">
                <IoLogOutOutline />
                Log out
              </li>
            </ol>
          </div>
        </div>
        <div className="flex justify-center items-center flex-grow ">
          {renderContent()}
        </div>
      </div>
    </HelmetProvider>
  );
}
