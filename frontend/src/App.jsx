import "@fontsource/inter";
import styles from './App.module.css';
import Header from './components/header/Header';
import LandingPage from './components/landingPage/LandingPage';
import Basis from './components/basisPage/Basis';
import Footer from "./components/footer/Footer";

import React, { useState } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const[image, setImage] = useState(null);
  const[prediction, setPrediction] = useState(null);
  const[confidence, setconfidence] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("FileImage", image);

    axios
    .post("http://127.0.0.1:8000/predict/", formData, {
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
    })
    .then((response) => {
      const data = response.data;
      if(data.success) {
        setPrediction(data.prediction);
        setconfidence(data.confidence);
      } else {
        alert("Prediction Failed. Please try again.")
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
      alert("An error occured. Please try again.")
    });
  };

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  return (
    <section className={styles.app}>
      <Header />
      <LandingPage handleImageChange={handleImageChange} handleSubmit={handleSubmit} image={image} prediction={prediction} confidence={confidence}/>
      <Basis />
      <Footer />
    </section>
  )
}

export default App
