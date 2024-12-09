import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import SideBar from "./SideBar";
export default function NavBar() {
  return (
    <div className="flex flex-col md:min-h-screen min-h-dvh">
      <Nav />
      <Outlet />
      <SideBar />
    </div>
  );
}
