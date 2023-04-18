import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";
import Task from "../Pages/Task/Task";
import NavBar from "../Components/Nav Bar/NavBar";
import Footer from "../Components/Footer/Footer";

function Router() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/task" element={<Task />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default Router;
