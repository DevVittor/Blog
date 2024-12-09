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

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="/post/:id" element={<DetailsPost />} />
          <Route path="/about" exact element={<About />} />
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
