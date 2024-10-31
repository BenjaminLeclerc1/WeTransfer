import React, { useEffect, useState } from 'react';
import Home from './Home';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(''); // Remplacer par l'ID utilisateur après connexion
  const [message, setMessage] = useState('');
  

  useEffect(() => {
    // Récupérez l'ID utilisateur depuis le localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
  
    // Récupération du token JWT depuis le stockage local (ou depuis votre état, selon votre implémentation)
    const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké lors de la connexion
  
    try {
      const response = await fetch('http://localhost:3000/files/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le token aux en-têtes
        },
      });
  
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Erreur lors de l\'upload');
    }
  };
  

  return (
    <div>
           <Home/>
      <h2>Upload de fichier</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Uploader</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;
