const Header = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow border border-violet-100">
      <h2 className="text-xl font-bold text-violet-700">
        Welcome {user?.first_name}
      </h2>
      <p className="text-gray-400 text-sm">@{user?.username}</p>
    </div>
  );
};

export default Header;