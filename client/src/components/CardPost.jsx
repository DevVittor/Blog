import PropTypes from "prop-types";
export default function CardPost({ author, edit, title, content, category }) {
  return (
    <div className="p-3 border border-zinc-200 flex flex-col flex-wrap gap-1 rounded-md hover:cursor-pointer mb-2 break-inside-avoid">
      <div className="flex justify-between items-center flex-wrap gap-2 ">
        <span>Publicado por: {author}</span>
        {edit && <span>Editado</span>}
      </div>
      <h2 className="text-2xl font-bold leading-7">{title}</h2>
      <p className="text-zinc-700 font-light leading-5">{content}</p>
      {category && <span>{category}</span>}
    </div>
  );
}

CardPost.propTypes = {
  author: PropTypes.string,
  edit: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  category: PropTypes.string,
};
