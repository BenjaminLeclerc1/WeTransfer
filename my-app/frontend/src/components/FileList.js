import React, { useEffect, useState } from "react";
import { getFiles, createShareLink, deleteFile } from "../api/files"; // Importation de deleteFile
import Header from "./Header";

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
      console.error(
        "Erreur lors de la génération du lien de téléchargement",
        error
      );
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
    <>
    <Header/>
    <div className="container mt-5">
     
      {loading ? (
        <p>Chargement des fichiers...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="containerTransfer">
          <h2 className="text-center mt-3 mb-3">
            Liste des Fichiers Transférés
          </h2>

          {/* Affichage sous forme de tableau */}
          {files.length > 0 ? ( // Correction ici
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Nom du fichier</th>
                  <th scope="col">Taille</th>
                  <th scope="col">Expiration</th>
                  <th scope="col">Lien de partage</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file._id}>
                    <td>{file.filename}</td>
                    <td>{file.size} bytes</td>
                    <td>{file.expiresAt ? new Date(file.expiresAt).toLocaleString() : "pas de lien de telechargement" }</td>
                    <td> 
                      <div>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handleDownload(file._id)}
                        >
                          Obtenir le lien de téléchargement
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(file._id)}
                        >
                          Supprimer
                        </button>
                      </div>

                      {downloadLinks[file._id] && (
                        <p className="mt-2">
                          Lien :
                          <a
                            href={downloadLinks[file._id]}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {downloadLinks[file._id]}
                          </a>
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun fichier trouvé.</p> // Ajout pour gérer le cas où aucun fichier n'est présent
          )}
        </div>
      )}
    </div></>
  );
}

export default FileList;





   // <ul className="list-group">
        //   {files.map((file) => (
        //     <li key={file._id} className="list-group-item d-flex flex-column align-items-start">
        //       <div className="d-flex justify-content-between w-100">
        //         <span>{file.filename}</span>
        //         <div>
        //           <button className="btn btn-primary btn-sm me-2" onClick={() => handleDownload(file._id)}>
        //             Obtenir le lien de téléchargement
        //           </button>
        //           <button className="btn btn-danger btn-sm" onClick={() => handleDelete(file._id)}>
        //             Supprimer
        //           </button>
        //         </div>
        //       </div>
        //       {/* Affiche le lien de téléchargement sous le fichier après le clic sur Obtenir le lien */}
        //       {downloadLinks[file._id] && (
        //         <p className="mt-2">
        //           Lien : <a href={downloadLinks[file._id]} target="_blank" rel="noopener noreferrer">{downloadLinks[file._id]}</a>
        //         </p>
        //       )}
        //     </li>
        //   ))}
        // </ul>