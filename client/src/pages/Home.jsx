import { useEffect, useState } from "react";
import CardPost from "../components/CardPost";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const allPost = async () => {
    const response = await fetch("https://blog-e1jn.onrender.com/api/v1/post/all");
    if (response.ok) {
      const convertJson = await response.json();
      setPosts(convertJson.list);
    }
  };

  useEffect(() => {
    allPost();
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Page Home" />
      </Helmet>
      <div className="flex justify-start items-center flex-col flex-1 ">
        <div className="w-full flex justify-end p-3">
          <Link to="/new">
            <button className="px-3 py-1 bg-black text-zinc-100 font-bold rounded-md flex items-center gap-1">
              <FiPlus />
              New Post
            </button>
          </Link>
        </div>
        <div className="flex justify-start items-center flex-col gap-3">
          <div className="columns-4 flex-wrap gap-2">
            {posts &&
              posts.map((item) => (
                <Link to={`/post/${item._id}`} key={item._id}>
                  <CardPost
                    author={item.author}
                    edit={item.edit}
                    title={item.title}
                    content={item.content}
                    categories={item.categories}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}
