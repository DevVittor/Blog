import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://blog-e1jn.onrender.com/api/v1/user/register",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const responseJson = response.json();
        const token = responseJson.token;
        if (token) {
          localStorage.setItem("token", token);
        }
        alert("Register Done");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col gap-5 justify-center items-center">
        <h2 className="text-4xl font-bold">Register User</h2>
        <form
          className="flex flex-col gap-2 p-3 border border-zinc-200 rounded-md"
          onSubmit={registerUser}
        >
          <label className="flex flex-col gap-1.5" htmlFor="">
            <span className="font-medium">Username:</span>
            <input
              className="px-3 py-1 border border-zinc outline-none font-medium"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleData}
              placeholder="Username"
            />
          </label>
          <label className="flex flex-col gap-1.5" htmlFor="">
            <span className="font-medium">Email:</span>
            <input
              className="px-3 py-1 border border-zinc outline-none font-medium"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleData}
              placeholder="Email"
            />
          </label>
          <label className="flex flex-col gap-1.5" htmlFor="">
            <span className="font-medium">Password:</span>
            <input
              className="px-3 py-1 border border-zinc outline-none font-medium"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleData}
              placeholder="****"
            />
          </label>
          <input
            className="px-3 py-1 rounded-sm bg-black text-zinc-100 font-bold hover:cursor-pointer"
            type="submit"
            value="Register"
          />
        </form>
      </div>
    </div>
  );
}
