import axios from "axios";

const API_URL = "http://localhost:3000";

export const getFiles = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/files/myfiles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const downloadFile = async (fileId) => {
  console.log("je passe par la");
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `http://localhost:3000/files/${fileId}/download`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }
  );

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;

  const filename =
    response.headers["content-disposition"]
      ?.split("filename=")[1]
      ?.replace(/['"]/g, "") || "downloaded_file";
  link.setAttribute("download", filename);

  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const createShareLink = async (fileId) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/files/${fileId}/share`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    ...response.data,
    shareLink: `${response.data.shareLink}?token=${token}`,
  };
};

export const deleteFile = async (fileId) => {
  console.log("je passe par LAAAAAAAAAAAAAAAAAAAAAA");
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/files/${fileId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.status === 200) {
    throw new Error("Erreur lors de la suppression du fichier");
  }

  return response.data;
};
