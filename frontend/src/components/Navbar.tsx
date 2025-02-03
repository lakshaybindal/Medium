
export default function Navbar(props: { name: string; onclick: () => void }) {
  return (
    <div className="flex justify-between items-center px-6 py-3 shadow-md">
      {/* Left: Logo */}
      <div
        className="text-3xl font-serif text-gray-900 leading-relaxed
 font-bold"
      >
        Medium
      </div>

      {/* Right: Publish Button & User Initial */}
      <div className="flex items-center space-x-4">
        <button
          onClick={props.onclick}
          className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition"
        >
          Publish
        </button>
        {/* User Profile Icon with Initial */}
        <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full font-semibold text-lg">
          {props.name != "" ? props.name[0].toUpperCase() : props.name[0]}
        </div>
      </div>
    </div>
  );
}
