import { FaInstagram, FaTelegram, FaSquareXTwitter } from "react-icons/fa6";
export default function SideBar() {
  return (
    <footer>
      <div className="flex justify-between items-center px-3 py-1 border-t border-zinc-200">
        <div className="">
          <span>Todos os direitos reservados &copy; | 2022-2025</span>
        </div>
        <div className="">
          <ol className="flex items-center gap-1.5">
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaTelegram />
            </li>
            <li>
              <FaSquareXTwitter />
            </li>
          </ol>
        </div>
      </div>
    </footer>
  );
}
