const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-violet-600 text-white p-3 rounded-xl font-semibold hover:bg-violet-700 transition"
    >
      {text}
    </button>
  );
};

export default Button;