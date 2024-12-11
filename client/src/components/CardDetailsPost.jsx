import PropTypes from "prop-types";
export default function CardDetailsPost({
  title,
  content,
  category,
  createdAt,
}) {
  return (
    <div className="border border-zinc-200 w-full rounded-md p-3 flex flex-col gap-2">
      <h1 className="text-4xl font-bold leading-9 text-pretty">{title}</h1>
      <p className="text-zinc-700 font-light text-pretty">{content}</p>
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <span>{category}</span>
        <span>Publição: {createdAt}</span>
      </div>
    </div>
  );
}
CardDetailsPost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
