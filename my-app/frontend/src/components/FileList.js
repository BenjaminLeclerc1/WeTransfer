import React, { useEffect, useState } from 'react';
import { getFiles, createShareLink, deleteFile } from '../api/files'; // Ajout de deleteFile

function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadLinks, setDownloadLinks] = useState({}); // État pour stocker les liens de téléchargement

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const data = await getFiles();
        setFiles(data);
      } catch (error) {
        setError("Erreur lors de la récupération des fichiers.");
        console.error("Erreur lors de la récupération des fichiers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = async (fileId) => {
    try {
      const data = await createShareLink(fileId); // Récupère le lien de téléchargement depuis le backend
      setDownloadLinks((prevLinks) => ({
        ...prevLinks,
        [fileId]: data.shareLink, // Stocke le lien sans déclencher le téléchargement
      }));
    } catch (error) {
      setError("Erreur lors de la génération du lien de téléchargement.");
      console.error("Erreur lors de la génération du lien de téléchargement", error);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await deleteFile(fileId); // Appelle la fonction de suppression
      setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId)); // Met à jour la liste des fichiers
      alert("Fichier supprimé avec succès !");
    } catch (error) {
      setError("Erreur lors de la suppression du fichier.");
      console.error("Erreur lors de la suppression du fichier", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Mes Fichiers</h2>
      {loading ? (
        <p>Chargement des fichiers...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <ul className="list-group">
          {files.map((file) => (
            <li key={file._id} className="list-group-item d-flex flex-column align-items-start">
              <div className="d-flex justify-content-between w-100">
                <span>{file.filename}</span>
                <div>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => handleDownload(file._id)}>
                    Obtenir le lien de téléchargement
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(file._id)}>
                    Supprimer
                  </button>
                </div>
              </div>
              {/* Affiche le lien de téléchargement sous le fichier après le clic sur Obtenir le lien */}
              {downloadLinks[file._id] && (
                <p className="mt-2">
                  Lien : <a href={downloadLinks[file._id]} target="_blank" rel="noopener noreferrer">{downloadLinks[file._id]}</a>
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FileList;
