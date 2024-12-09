import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const convertJson = await response.json();
        console.log(convertJson);
        const token = convertJson.token;
        localStorage.setItem("token", token);
        alert(convertJson.msg);
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
    <HelmetProvider>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Page from login user" />
      </Helmet>
      <div className="flex flex-1 justify-center items-center">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold">&gt; Login</h1>
          <form
            className="flex flex-col items-start gap-2 p-3 rounded-md border border-zinc-200"
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col gap-1.5" htmlFor="">
              <span className="font-medium">Email:</span>
              <input
                className="px-3 py-1 rounded-sm outline-none focus:bg-zinc-50 font-medium border border-zinc-100 focus:border-zinc-200"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleData}
                required
              />
            </label>
            <label className="flex flex-col gap-1.5" htmlFor="">
              <span className="font-medium">Password:</span>
              <input
                className="px-3 py-1 rounded-sm outline-none focus:bg-zinc-50 font-medium border border-zinc-100 focus:border-zinc-200"
                type="password"
                name="password"
                value={formData.password}
                placeholder="****"
                onChange={handleData}
                required
              />
            </label>
            <input
              className="bg-black hover:bg-black/80 transition-colors ease-in-out duration-100 text-zinc-100 font-bold px-3 py-1 rounded-sm hover:cursor-pointer mt-2"
              type="submit"
              value="&gt; Login"
            />
          </form>
        </div>
      </div>
    </HelmetProvider>
  );
}
