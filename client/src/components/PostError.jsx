import { Helmet, HelmetProvider } from "react-helmet-async";

export default function PostError() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Post Erro</title>
        <meta name="description" content="Page Error Post" />
      </Helmet>
      <div className="flex-1 flex justify-center items-center">
        <h1 className="text-4xl font-bold">Post inválido</h1>
      </div>
    </HelmetProvider>
  );
}
