import { useEffect, useState } from 'react';
import Header from '../navBar/Header';

export default function ListesOfTransfer() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/files/share-links', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setFiles(data.files || []);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <h2>Liste des Fichiers Transférés</h2>
      {files.length === 0 ? (
        <p>Aucun fichier n'a été partagé.</p>
      ) : (
        <ul>
          {files.map(file => (
            <li key={file._id}>
              <p>Nom du fichier : {file.filename}</p>
              <p>Taille : {file.size} bytes</p>
              <p>Expiration : {new Date(file.expiresAt).toLocaleString()}</p>
              <a href={file.shareLink} target="_blank" rel="noopener noreferrer">
                Télécharger via le lien de partage
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
