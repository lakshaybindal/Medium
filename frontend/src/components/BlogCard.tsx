
type BlogCardProps = {
  authorname: string;
  title: string;
  content: string;
  date: string;
  fullblog: () => void;
};

export default function BlogCard(props: BlogCardProps) {
  return (
    <div
      onClick={props.fullblog}
      className="cursor-pointer border-b border-gray-200 py-6 flex justify-between items-start"
    >
      <div className="flex-1">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="font-semibold">{props.authorname}</span>
          <span className="text-gray-400">· {props.date}</span>
        </div>

        <h2 className="text-lg font-bold text-gray-900 mt-1">{props.title}</h2>

        <p className="text-gray-600 mt-1">{props.content.slice(0, 100)}...</p>

        {/* Footer - Category & Read Time */}
        <div className="flex items-center mt-3 space-x-2 text-sm text-gray-500">
          <span>{Math.ceil(props.content.length / 100)} min read</span>
          <button className="hover:text-gray-700">
            <i className="far fa-bookmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
