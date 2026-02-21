const Card = ({ title, value, color }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow border border-violet-100">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className={`font-bold text-lg ${color}`}>{value}</p>
    </div>
  );
};

export default Card;