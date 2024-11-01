import React, { useEffect, useState } from "react";
import { getFiles, createShareLink, deleteFile } from "../api/files";
import Header from "./Header";
import ".././assets/css/FileList.css";

function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadLinks, setDownloadLinks] = useState({});
  const [copySuccess, setCopySuccess] = useState(false);

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
      const data = await createShareLink(fileId);
      const shareLink = data.shareLink;

      setDownloadLinks((prevLinks) => ({
        ...prevLinks,
        [fileId]: shareLink,
      }));

      // Copier le lien
      await navigator.clipboard.writeText(shareLink);
      setCopySuccess(true); // Afficher le message de succès
      setTimeout(() => setCopySuccess(false), 2000); // Masquer après 2 secondes
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
      await deleteFile(fileId);
      setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
      alert("Fichier supprimé avec succès !");
    } catch (error) {
      setError("Erreur lors de la suppression du fichier.");
      console.error("Erreur lors de la suppression du fichier", error);
    }
  };

  const handleCloseLink = (fileId) => {
    setDownloadLinks((prevLinks) => {
      const newLinks = { ...prevLinks };
      delete newLinks[fileId];
      return newLinks;
    });
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        {copySuccess && (
          <div className="copy-alert alert alert-success text-center">
            Le lien a été copié avec succès !
          </div>
        )}

        {loading ? (
          <p>Chargement des fichiers...</p>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="containerTransfer">
            <h2 className="text-center mt-3 mb-3">
              Liste des Fichiers Transférés
            </h2>

            {files.length > 0 ? (
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
                      <td>
                        {file.expiresAt
                          ? new Date(file.expiresAt).toLocaleString()
                          : "pas de lien de téléchargement"}
                      </td>
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
                          <div className="mt-2 d-flex align-items-center">
                            <span
                              className="me-2"
                              style={{
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Lien :{" "}
                              <a
                                href={downloadLinks[file._id]}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {downloadLinks[file._id]}
                              </a>
                            </span>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => handleCloseLink(file._id)}
                            >
                              Fermer
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Aucun fichier trouvé.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default FileList;
