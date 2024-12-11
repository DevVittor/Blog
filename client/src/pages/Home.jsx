import { useEffect, useState } from "react";
import CardPost from "../components/CardPost";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const allPost = async () => {
    try {
      const response = await fetch(
        "https://blog-e1jn.onrender.com/api/v1/post/all"
      );
      if (response.ok) {
        const convertJson = await response.json();
        if (Array.isArray(convertJson.list)) {
          setPosts(convertJson.list);
        } else {
          console.error("Expected an array but received:", convertJson.list);
          setPosts([]); // Defina como vazio caso a estrutura seja incorreta
        }
      }
    } catch (error) {
      console.error(error);
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
      <div className="flex justify-start items-center flex-col flex-1">
        <div className="flex justify-start items-center flex-col gap-3 p-3">
          <div className="md:columns-4 columns-1 flex-wrap gap-2">
            {Array.isArray(posts) &&
              posts.map((item) => (
                <Link to={`/post/${item._id}`} key={item._id}>
                  <CardPost
                    author={item.author}
                    edit={item.edit}
                    title={item.title}
                    content={item.content}
                    category={item.category}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}
