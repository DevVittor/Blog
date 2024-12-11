import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router";
import CardDetailsPost from "../components/CardDetailsPost";
import SendContact from "../components/SendContact";
export default function DetailsPost() {
  const postId = useParams();
  console.log(postId);
  const [post, setPost] = useState({});

  useEffect(() => {
    handleDataPost();
  }, []);

  const handleDataPost = async () => {
    try {
      const response = await fetch(
        `https://blog-e1jn.onrender.com/api/v1/post/details?postId=${postId.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const convertJson = await response.json();
        console.log("Details Post: ", convertJson);
        setPost(convertJson.details);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.content} />
      </Helmet>
      <div className="flex justify-start items-center flex-wrap flex-1 flex-col md:gap-5 gap-3 md:p-5 p-2">
        <div className="flex justify-center items-start flex-wrap gap-3">
          <div className="flex flex-col gap-3 md:w-[600px] w-full">
            <CardDetailsPost
              title={post.title}
              content={post.content}
              category={post.category}
              createdAt={post.createdAt || "20/04/2024"}
            />
            <SendContact />
          </div>
          <div className="flex flex-col gap-3 h-auto md:w-[400px] w-full border border-zinc-200 rounded-md p-3">
            <div className="">
              {post.author && (
                <div className="flex flex-col gap-1 flex-wrap">
                  <h2>Author: {post.author}</h2>
                </div>
              )}
              {post.category && post.skills && (
                <div className="">
                  <ol>
                    <li>Nível: {post.level}</li>
                    <li>Categoria: {post.category}</li>
                    <li className="flex flex-wrap">
                      Habidades:
                      {post.skills.map((item, index) => (
                        <b className="mx-1" key={index}>
                          {item}
                        </b>
                      ))}
                    </li>
                  </ol>
                </div>
              )}
              <div className="flex justify-between items-center gap-1.5">
                <button>
                  R$ {post.price?.min ?? 1} - R$ {post.price?.max ?? 10}
                </button>
                <button>{post.contact}</button>
              </div>
            </div>
            <hr />
            <div className="bg-zinc-50 border border-zinc-200 h-auto w-full rounded-md p-3">
              <form className="flex flex-col gap-2">
                <label className="flex flex-col gap-1.5" htmlFor="">
                  <span className="font-medium">Envie a sua proposta:</span>
                  <textarea
                    className="resize-none outline-none h-[200px] p-3"
                    name=""
                    placeholder="Informe como você vai conseguir resolver esse problema"
                  ></textarea>
                </label>
                <div className="flex justify-center items-center flex-col gap-2 bg-red-500">
                  <button className="bg-black text-zinc-100 font-bold px-3 py-1 rounded-sm w-full flex-grow">
                    Enviar Proposta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}
