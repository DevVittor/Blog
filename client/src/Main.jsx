import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Found from "./pages/Found";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/admin/Users";
import CreatePost from "./pages/user/CreatePost";
import Login from "./pages/Login";
import DetailsPost from "./pages/DetailsPost";
import MenuUser from "./components/MenuUser";
import Messages from "./pages/Messages";
import MyPosts from "./pages/MyPosts";
import Support from "./pages/Support";
import Feedback from "./pages/Feedback";
import EditProfile from "./pages/EditProfile";

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="/post/:id" element={<DetailsPost />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/messages" exact element={<Messages />} />
          <Route path="/my-posts" exact element={<MyPosts />} />
          <Route path="/test" exact element={<MenuUser />} />
          <Route path="/support" exact element={<Support />} />
          <Route path="/edit/profile" exact element={<EditProfile />} />
          <Route path="/feedback" exact element={<Feedback />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/users" exact element={<Users />} />
          <Route path="/new" exact element={<CreatePost />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="*" element={<Found />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
