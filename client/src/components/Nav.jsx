import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";

export default function Nav() {
  const [token, setToken] = useState("");
  // Função para verificar e atualizar o token
  const checkToken = () => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || ""); // Atualiza o estado com o token ou vazio
  };

  useEffect(() => {
    // Verifica o token ao montar o componente
    checkToken();

    // Adiciona listener para mudanças no localStorage
    window.addEventListener("storage", checkToken);

    return () => {
      // Remove listener ao desmontar
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  const handleLogout = () => {
    // Remove o token do localStorage e atualiza o estado
    localStorage.removeItem("token");
    setToken(""); // Atualiza o estado local
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      <div className="flex justify-between items-center px-5 py-1">
        <div className="">
          <Link to="/">
            <h1 className="text-2xl font-bold">Blog</h1>
          </Link>
        </div>
        <div className="">
          {token ? (
            <ol className="flex items-center flex-wrap gap-1.5">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  className="flex items-center gap-1 px-3 py-1 ml-3 rounded-sm font-medium bg-black text-zinc-100"
                  onClick={handleLogout}
                >
                  <MdLogout />
                  Logout
                </button>
              </li>
            </ol>
          ) : (
            <ol className="flex items-center flex-wrap gap-1.5">
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ol>
          )}
        </div>
      </div>
    </header>
  );
}
