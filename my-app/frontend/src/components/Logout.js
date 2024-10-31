// frontend/src/components/LogoutButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {

    
    fetch("http://localhost:3000/users/logout", { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "deconnected") {
          // Supprimer le token JWT du localStorage
          localStorage.removeItem("token");

          // Rediriger vers la page de connexion
          navigate("/login");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <Home />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Logout;
