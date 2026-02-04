import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import NotFound from "./pages/NotFound";
import StudentsList from "./pages/StudentsList";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/students" element={<StudentsList />} />
      <Route path="/students/add" element={<AddStudent />} />
      <Route path="/students/edit/:id" element={<EditStudent />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
