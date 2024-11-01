import React, { useEffect, useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/files/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Erreur lors de l'upload");
    }
  };

  return (
    <>
      <div className="containerFile">
        <div className="container">
          <form onSubmit={handleSubmit} className="sendContainer">
            <h1 className="text-center m-5">Ajouter des fichiers</h1>
            <div className="inputContainer mb-3">
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit">Uploader</button>
          </form>
          {message && <p className="bg-success text-white">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
