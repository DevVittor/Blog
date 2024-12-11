import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { jwtDecode } from "jwt-decode";
export default function CreatePost() {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Web",
    skills: ["JavaScript", "HTML5", "Css3"],
    level: "Profissional",
    price: {
      min: 20,
      max: 120,
    },
    contact: "(21) 99754-392",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded._id);
    }
  }, []);

  const handleDataPost = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://blog-e1jn.onrender.com/api/v1/post/create?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const responseJSON = await response.json();
        console.log(responseJSON);
        alert("Post Created");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleData = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Create Post</title>
        <meta name="description" content="Page from create post" />
      </Helmet>
      <div className="flex justify-center items-center flex-col gap-3 flex-1">
        <h1 className="text-4xl font-bold">Create Post</h1>
        <form
          className="border border-zinc-200 p-3 rounded-md flex flex-col gap-2 w-[400px]"
          onSubmit={handleDataPost}
        >
          <label className="flex flex-col gap-1.5" htmlFor="">
            <span className="font-medium text-lg">Title:</span>
            <input
              className="px-3 py-1 border border-zinc-200 outline-none rounded-sm font-medium focus:bg-zinc-50 transition-colors ease-in-out delay-100"
              type="text"
              name="title"
              placeholder="New Title"
              onChange={handleData}
              value={formData.title}
            />
          </label>
          <label className="flex flex-col gap-1.5" htmlFor="">
            <span className="font-medium text-lg">Content:</span>
            <textarea
              className="border border-zinc-100 outline-none p-3 resize-none h-[200px] font-medium focus:bg-zinc-50 transition-colors ease-in-out delay-100"
              name="content"
              placeholder="Content Post"
              onChange={handleData}
              value={formData.content}
            ></textarea>
          </label>
          <input
            className="bg-black text-zinc-100 font-bold rounded-sm hover:cursor-pointer mt-2 px-3 py-1"
            type="submit"
            value="Create Post"
          />
        </form>
      </div>
    </HelmetProvider>
  );
}
