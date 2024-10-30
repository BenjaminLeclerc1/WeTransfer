import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Bienvenue sur le Serveur de Fichiers</h1>
      <Register />
      <Login />
      <FileUpload />
    </div>
  );
}

export default App;
