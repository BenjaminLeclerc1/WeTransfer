import React, { useEffect, useState } from "react";
import ShareLink from "./ShareLink";
import { createShareLink, deleteFile, getFiles } from "./Api";

function FileList() {
  const [files, setFiles] = useState([]);
  const [shareLink, setShareLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true); // Indiquer que le chargement commence
      try {
        const data = await getFiles(); // Appel à la fonction pour récupérer les fichiers
        setFiles(data); // Mettre à jour l'état avec les fichiers récupérés
      } catch (error) {
        setError("Erreur lors de la récupération des fichiers.");
        console.error("Erreur lors de la récupération des fichiers", error);
      } finally {
        setLoading(false); // Indiquer que le chargement est terminé
      }
    };

    fetchFiles();
  }, []);

  const handleShare = async (fileId) => {
    try {
      const data = await createShareLink(fileId); // Appel à la fonction pour créer un lien de partage
      setShareLink(data.shareLink); // Mettre à jour l'état avec le lien de partage
    } catch (error) {
      setError("Erreur lors de la création du lien de partage.");
      console.error("Erreur lors de la création du lien de partage", error);
    }
  };



// Fonction pour gérer la suppression du fichier
const handleDelete = async (fileId) => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer ce fichier ?")) { // Confirmation de l'utilisateur
    try {
      await deleteFile(fileId); // Appel à la fonction pour supprimer le fichier
      setFiles(files.filter(file => file._id !== fileId)); // Met à jour l'état pour supprimer le fichier de la liste
    } catch (error) {
      setError("Erreur lors de la suppression du fichier.");
      console.error("Erreur lors de la suppression du fichier", error);
    }
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
        <>
          <ul className="list-group">
            {files.map((file) => (
              <li key={file._id} className="list-group-item d-flex justify-content-between align-items-center">
                {file.filename}
                <div>
                <button className="btn btn-info btn-sm" onClick={() => handleShare(file._id)}>
                  Partager
                </button>
                
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(file._id)}>
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {shareLink && <ShareLink link={shareLink} />}
        </>
      )}
    </div>
  );
}

export default FileList;
