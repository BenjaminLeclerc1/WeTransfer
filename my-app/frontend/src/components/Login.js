import React, { useState } from "react";
import Home from "./Home";
import { useNavigate } from "react-router-dom";

import "../assets/css/LoRe.css";
import Header from "./Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(""); // Ajout de l'état pour userId
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Utilisez directement email et password
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Stocke le token lors de la connexion
        setUserId(data.userId); // Enregistre également l'ID utilisateur
        setMessage(data.message);
        // Rediriger vers la page d'accueil
        navigate("/");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Erreur lors de la connexion");
    }
  };

  return (
    <div>
      <Header />
      <div className="containerRe">
        <form onSubmit={handleSubmit} className="formElement">
          <h2>Connexion</h2>

          <div className="d-flex flex-column mb-3 w-100">
            <label htmlFor="email" className="mb-2">
              Nom d'Utilisateur
            </label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="d-flex flex-column mb-3 w-100">
            <label htmlFor="password" className="mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Se connecter</button>
          </div>
        </form>
        {message && <p className='text-danger'>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
