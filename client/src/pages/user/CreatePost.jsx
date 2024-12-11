import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { jwtDecode } from "jwt-decode";
export default function CreatePost() {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    skills: [],
    level: "",
    price: {
      min: null,
      max: null,
    },
    contact: "",
  });

  console.log("FormDAta: ", formData);

  const categories = ["Web", "tecnologia", "novela"];
  const listSkills = [
    "JavaScript",
    "HTML5",
    "Css3",
    "Node.js",
    "TypeScript",
    "Photoshop",
    "Sony Vegas Pro 14",
    "Blender",
    "Unreal Engine 4",
    "Unity",
  ];
  const levels = ["Amador", "Intermediário", "Profissional"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded._id);
    }
  }, []);

  const handleDataPost = async (event) => {
    event.preventDefault();
    if (!validateFormData()) return;

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
    const { name, value, type, options } = event.target;

    if (name === "skills") {
      const selectedSkills = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prevData) => ({
        ...prevData,
        skills: selectedSkills,
      }));
      return;
    }

    if (name === "min" || name === "max") {
      setFormData((prevData) => ({
        ...prevData,
        price: {
          ...prevData.price,
          [name]: Number(value),
        },
      }));
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const validateFormData = () => {
    const { title, content, category, skills, level, price } = formData;
    if (!title || !content || !category || !skills.length || !level) {
      alert("Todos os campos são obrigatórios!");
      return false;
    }
    if (price.min === null || price.max === null || price.min > price.max) {
      alert("Valores de preço inválidos!");
      return false;
    }
    return true;
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
          <div className="flex justify-center items-center gap-2 w-full">
            <label className="flex flex-col gap-1.5 w-full" htmlFor="">
              <span className="font-medium">Level:</span>
              <select
                className="px-3 py-1 border border-zinc-200 bg-white hover:cursor-default outline-none"
                name="level"
                value={formData.level}
                onChange={handleData}
              >
                <option value="" disabled>
                  Select
                </option>
                {levels &&
                  levels.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 w-full" htmlFor="">
              <span className="font-medium">Skills:</span>
              <select
                className="px-3 py-1 border border-zinc-200 bg-white hover:cursor-default outline-none"
                name="skills"
                value={formData.skills}
                onChange={handleData}
                multiple
              >
                {listSkills &&
                  listSkills.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div className="flex justify-center items-center gap-2">
            <label className="flex flex-col gap-1.5" htmlFor="">
              <span className="font-medium">Contact:</span>
              <input
                className="px-3 py-1 outline-none border border-zinc-200 w-full"
                type="text"
                name="contact"
                value={formData.contact}
                placeholder="(xx) xxxxxx-xxx"
                onChange={handleData}
              />
            </label>
            <label className="flex flex-col gap-1.5" htmlFor="">
              <span className="font-medium">Category:</span>
              <select
                className="px-3 py-1 border border-zinc-200 rounded-sm bg-white outline-none"
                onChange={handleData}
                name="category"
                value={formData.category}
              >
                <option value="" disabled>
                  Selecione
                </option>
                {categories &&
                  categories.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div className="flex justify-center items-center gap-2">
            <label className="flex flex-col gap-1.5" htmlFor="">
              <span className="font-medium">Valor mínimo:</span>
              <input
                className="px-3 py-1 outline-none border border-zinc-200 w-full"
                type="number"
                name="min"
                value={formData.price.min}
                placeholder="R$ xx"
                onChange={handleData}
              />
            </label>
            <label className="flex flex-col gap-1.5" htmlFor="">
              <span className="font-medium">Valor máximo:</span>
              <input
                className="px-3 py-1 outline-none border border-zinc-200 w-full"
                type="number"
                name="max"
                value={formData.price.max}
                placeholder="R$ xx"
                onChange={handleData}
              />
            </label>
          </div>
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
