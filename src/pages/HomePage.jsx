import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputName } from "../components/InputName";
import { useAuth } from "../context/AuthProvider";

export const HomePage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleJoin = () => {
    if (!userName.trim()) {
      setError("Please enter a name!");
    } else {
      setError("");
      login(userName);
      navigate("/game");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Create a new player</h1>

      <InputName name={userName} setName={setUserName} />

      <button
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        onClick={handleJoin}
      >
        Join
      </button>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
};
