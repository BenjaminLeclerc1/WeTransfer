import { useState } from 'react';
import Header from '../navBar/Header';
import "../../assets/css/LoRe.css"

export default function Register () {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.log(error);
      setMessage('Erreur lors de l\'inscription');
    }
  };

  return (
    <div>
      <Header/>
      <div className='containerRe'>
        <form onSubmit={handleSubmit} className='formElement'>
        <h2>Inscription</h2>
          <div className="d-flex flex-column mb-3 w-100">
            <label htmlFor="username" className='mb-2'>Nom d'Utilisateur</label>
            <input
              id='username'
              name='username'
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="d-flex flex-column mb-2 w-100">
            <label htmlFor="email" className='mb-3'>Email</label>
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
          <div className="d-flex flex-column mb-2 w-100">
            <label htmlFor="password" className='mb-3'>Mot de passe</label>
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
          <button type="submit" className='mt-2'>S'inscrire</button>
        </form>
        {message && <p className='text-danger'>{message}</p>}
      </div>
    </div>
  );
};