import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import FileUpload from "./components/FileUpload";
import "./App.css";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import FileList from "./components/FileList";

function App() {
  return (
    <div className="App">
      <Routes>
       <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/fileupload" element={<FileUpload />} />
        <Route path="/filelist" element={<FileList />} />
      </Routes>
     
    </div>
  );
}

export default App;
