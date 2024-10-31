import React from "react";

function ShareLink({ link }) {
  return (
    <div className="alert alert-info mt-3">
      <p>Lien de partage :</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        {link}
      </a>
    </div>
  );
}

export default ShareLink;
