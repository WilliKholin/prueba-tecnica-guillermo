import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputName } from "../components/InputName";
import { useAuth } from "../context/AuthProvider";
import { ButtonJoin } from "../components/ButtonJoin";
import { GeneralError } from "../components/GeneralError";

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

      <ButtonJoin onJoin={handleJoin} />
      {error && <GeneralError error={error} />}
    </div>
  );
};
