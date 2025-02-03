
export default function Button(props: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={props.onClick}
      className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
    >
      {props.label}
    </button>
  );
}
