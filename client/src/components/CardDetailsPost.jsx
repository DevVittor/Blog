import PropTypes from "prop-types";
export default function CardDetailsPost({ title, content, categories }) {
  return (
    <div className="border border-zinc-200 w-[700px] rounded-md p-3 flex flex-col gap-2">
      <h1 className="text-4xl font-bold leading-9 text-pretty">{title}</h1>
      <p className="text-zinc-700 font-light text-pretty">{content}</p>
      <ol className="flex items-center gap-1.5">
        {categories &&
          categories.map((item, index) => (
            <li
              className="px-3 py-1 border border-zinc-200 bg-zinc-50"
              key={index}
            >
              {item}
            </li>
          ))}
      </ol>
    </div>
  );
}
CardDetailsPost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
};
