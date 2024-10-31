import axios from 'axios';

// Définir l'URL de base de votre API
const API_URL = 'http://localhost:3000'; // Remplacez cela par votre URL d'API

// Fonction pour récupérer la liste des fichiers
export const getFiles = async () => {
  try {
    const response = await axios.get(`${API_URL}/myfiles`); // Utilisation de la route /myfiles
    console.log(response.data);
    return response.data; // Retourner les données de la réponse
    
    
  } catch (error) {
    console.error("Erreur lors de la récupération des fichiers:", error.response ? error.response.data : error.message);
    throw error; // Relancer l'erreur pour permettre le traitement ultérieur
  }
};

// Fonction pour créer un lien de partage pour un fichier
export const createShareLink = async (fileId) => {
  try {
    const response = await axios.get(`${API_URL}/${fileId}/share`); // Utilisation de la route /:fileId/share
    return response.data; // Retourner les données de la réponse
  } catch (error) {
    console.error("Erreur lors de la création du lien de partage:", error.response ? error.response.data : error.message);
    throw error; // Relancer l'erreur pour permettre le traitement ultérieur
  }
};
