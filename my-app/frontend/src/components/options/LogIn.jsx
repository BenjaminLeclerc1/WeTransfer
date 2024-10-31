import React, { useState } from 'react';
import "../../assets/css/LoRe.css"
import Header from '../navBar/Header';

export default function LogIn () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(''); // Ajout de l'état pour userId

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
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      
      setMessage('Erreur lors de la connexion');
    }
  };

  return (
    <div>
      <Header/>
      <div className='containerRe'>
        <form onSubmit={handleSubmit} className='formElement'>
          <h2>Connexion</h2>
          <div className="d-flex flex-column mb-3 w-100">
            <label htmlFor="email" className='mb-2'>Nom d'Utilisateur</label>
            <input
              name='email'
              id='email'
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-flex flex-column mb-3 w-100">
            <label htmlFor="password" className='mb-2'>Password</label>
            <input
              name='password'
              id='password'
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
        {message && <p className='text-danger'>{message}</p>}
      </div>
    </div>
  );
};
