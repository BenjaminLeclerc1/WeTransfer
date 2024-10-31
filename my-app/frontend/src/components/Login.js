import React, { useState } from 'react';
import Home from './Home';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(''); // Ajout de l'état pour userId
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

 

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Utilisez directement email et password
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Stocke le token lors de la connexion
        setUserId(data.userId); // Enregistre également l'ID utilisateur
        setMessage(data.message);
         // Rediriger vers la page d'accueil
         navigate("/");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Erreur lors de la connexion');
    }
  };

  return (
    <div>
      <Home/>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
