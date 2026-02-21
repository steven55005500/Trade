import { useEffect, useState } from "react";
import api from "../api/axios";
import { useTelegram } from "../hooks/useTelegram";
import Header from "../components/Header";
import Card from "../components/Card";
import Button from "../components/Button";

const Dashboard = () => {
  const { user } = useTelegram();
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    if (user) {
      api.post("/api/auth", user)
        .then(res => setDbUser(res.data.user))
        .catch(err => console.log(err));
    }
  }, [user]);

  if (!dbUser) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 space-y-4">
      
      <Header user={dbUser} />

      <div className="grid grid-cols-2 gap-4">
        <Card title="Trade Power" value="100.0000" color="text-violet-700" />
        <Card title="Total Earned" value="25.3400" color="text-green-600" />
      </div>

      <Button text="Withdraw" onClick={() => alert("Withdraw Clicked")} />
    </div>
  );
};

export default Dashboard;