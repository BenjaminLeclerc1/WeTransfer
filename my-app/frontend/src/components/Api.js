import axios from "axios";

const API_URL = "http://localhost:3000";

// Fonction pour récupérer la liste des fichiers
export const getFiles = async () => {
  try {
    console.log(localStorage.getItem("token"));
    const token = localStorage.getItem("token"); // Récupère le token stocké après connexion
    const response = await axios.get(`${API_URL}/files/myfiles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des fichiers:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Fonction pour créer un lien de partage pour un fichier
export const createShareLink = async (fileId) => {
  try {
    const token = localStorage.getItem("token"); // Récupère le token stocké après connexion
    const response = await axios.get(`${API_URL}/files/${fileId}/share`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la création du lien de partage:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
