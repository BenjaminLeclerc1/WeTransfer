import { useState } from "react";

export default function FilesUpload() {
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
      <div>
        <h2>Upload de fichier</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} required />
          <button type="submit">Uploader</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
}
