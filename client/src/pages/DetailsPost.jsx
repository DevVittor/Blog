import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router";
import CardDetailsPost from "../components/CardDetailsPost";
import PostError from "../components/PostError";
export default function DetailsPost() {
  const postId = useParams();
  console.log(postId);
  const [render, setRender] = useState(false);
  const [post, setPost] = useState({});

  useEffect(() => {
    handleDataPost();
  }, []);

  const handleDataPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/post/details?postId=${postId.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const convertJson = await response.json();
        console.log(convertJson);
        setPost(convertJson.details);
        setRender(true);
      }
    } catch (error) {
      console.error(error);
      setRender(false);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.content} />
      </Helmet>
      {render ? (
        <div className="flex justify-center items-start flex-1 p-5">
          {post && (
            <CardDetailsPost
              title={post.title}
              content={post.content}
              categories={post.categories}
            />
          )}
        </div>
      ) : (
        <PostError />
      )}
    </HelmetProvider>
  );
}
