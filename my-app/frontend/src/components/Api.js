import axios from 'axios';

// Définir l'URL de base de votre API
const API_URL = 'http://localhost:3000'; // Remplacez cela par votre URL d'API

// Fonction pour récupérer la liste des fichiers
export const getFiles = async () => {
  try {
    console.log("-sqjbdhdbqshdqbshsqbhsbdshqsbdhsbdhsbshsdbhsdbdsq",localStorage.getItem('token'))
    const token = localStorage.getItem('token'); // Récupère le token stocké après connexion
    const response = await axios.get(`${API_URL}/files/myfiles`, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token aux en-têtes
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des fichiers:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fonction pour créer un lien de partage pour un fichier
export const createShareLink = async (fileId) => {
  try {
    const token = localStorage.getItem('token'); // Récupère le token stocké après connexion
    const response = await axios.get(`${API_URL}/files/${fileId}/share`, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token aux en-têtes
      },
    }); // Utilisation de la route /:fileId/share
    return response.data; // Retourner les données de la réponse
  } catch (error) {
    console.error("Erreur lors de la création du lien de partage:", error.response ? error.response.data : error.message);
    throw error; // Relancer l'erreur pour permettre le traitement ultérieur
  }
};


// Api.js

// Fonction pour supprimer un fichier
export const deleteFile = async (fileId) => {
  const response = await fetch(`${API_URL}/files/${fileId}`, {
      method: 'DELETE', // Méthode HTTP pour supprimer
  });

  if (!response.ok) {
      throw new Error('Erreur lors de la suppression du fichier');
  }

  return await response.json(); // Retourne la réponse JSON
};
