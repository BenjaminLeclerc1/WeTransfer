import React, { useState } from 'react';
import "../assets/css/FileUpload.css"

export default function FilesUpload () {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(''); // Remplacer par l'ID utilisateur après connexion
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    try {
      const response = await fetch('http://localhost:3000/files/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Erreur lors de l\'upload');
    }
  };

  return (
    <div className='containerFile'>
      <div className='container'>
        <form onSubmit={handleSubmit} className='sendContainer'>
          <h1>Ajouter des fichiers</h1>
          <div className='inputContainer mb-3'>
            <label htmlFor="youremail">Envoyer à</label>
            <input type="email" name="youremail" id="youremail" placeholder='Envoyer à' />
          </div>
          <div className='inputContainer mb-3'>
            <label htmlFor="youremail">Votre adresse Email</label>
            <input type="email" name="myemail" id="myemail" placeholder='Votre adresse e-mail'/>
          </div>
          <div className="inputContainer mb-3">
            <label htmlFor="title">Titre</label>
            <input type="email" name="title" id="title"  placeholder='Titre'/>
          </div>
          <div className="inputContainer mb-3">
            <label htmlFor="file">Charger vos fichiers </label>
            <input type="file" id='file' onChange={handleFileChange} required />
          </div>

          <button type="submit">Uploader</button>
        </form>

        {message && <p className='text-danger'>{message}</p>}
      </div>
    </div>
  );
};
