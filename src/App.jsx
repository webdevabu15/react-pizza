import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./App.scss";
import Cart from "./components/Cart/Cart";
import { db } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
