import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuUser from "./MenuUser";
import { MdMenu, MdMenuOpen } from "react-icons/md";

export default function Nav() {
  const [openMenu, setOpenMenu] = useState(false);
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

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      <div className="flex justify-between items-center flex-wrap gap-2 md:px-5 md:py-1 p-2">
        <div className="">
          <Link to="/">
            <h1 className="text-2xl font-bold">Blog</h1>
          </Link>
        </div>
        <div className="">
          {token ? (
            <div className="relative ">
              <div
                className="flex items-center justify-center gap-2 hover:cursor-pointer md:bg-black md:text-zinc-100 font-medium md:px-3 md:py-1 md:rounded-full"
                onClick={() => setOpenMenu(!openMenu)}
              >
                <div className="md:flex hidden flex-col flex-wrap ">
                  <h3 className="text-sm font-medium">Vittor Fonseca Serra</h3>
                </div>
                {openMenu ? (
                  <MdMenuOpen className="text-lg" />
                ) : (
                  <MdMenu className="text-lg" />
                )}
              </div>
              {openMenu && <MenuUser />}
            </div>
          ) : (
            <ol className="flex items-center flex-wrap gap-1.5">
              <li>
                <Link to="/register">Register</Link>
              </li>
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
