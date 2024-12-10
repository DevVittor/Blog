import { Link } from "react-router-dom";

export default function MyPosts() {
  return (
    <div className="flex flex-1 justify-center items-center flex-col gap-5">
      <h1 className="text-4xl font-bold">Você não tem nenhum post</h1>
      <Link
        className="px-3 py-1 bg-black text-zinc-100 font-bold rounded-md"
        to="/new"
      >
        Criar um Post
      </Link>
    </div>
  );
}
