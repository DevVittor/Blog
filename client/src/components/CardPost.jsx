import PropTypes from "prop-types";
export default function CardPost({ author, edit, title, content, categories }) {
  return (
    <div className="p-3 border border-zinc-200 flex flex-col flex-wrap gap-1 rounded-md hover:cursor-pointer mb-2 break-inside-avoid">
      <div className="flex justify-between items-center flex-wrap gap-2 ">
        <span>Publicado por: {author}</span>
        {edit && <span>Editado</span>}
      </div>
      <h2 className="text-2xl font-bold leading-7">{title}</h2>
      <p className="text-zinc-700 font-light leading-5">{content}</p>
      <ol className="flex items-center gap-1.5 mt-1">
        {categories &&
          categories.map((item, index) => (
            <li
              className="px-3 py-1 text-sm rounded-sm font-medium bg-zinc-50 border border-zinc-200"
              key={index}
            >
              {item}
            </li>
          ))}
      </ol>
    </div>
  );
}

CardPost.propTypes = {
  author: PropTypes.string,
  edit: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  categories: PropTypes.array,
};
