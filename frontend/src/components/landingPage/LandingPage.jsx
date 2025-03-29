import React, { useState, useRef } from "react";
import styles from "./landingPage.module.css";

function landingPage({ handleSubmit, handleImageChange, image, prediction, confidence }) {
  const [dragging, setDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState("⬅️ Click to Predict");
  const fileInputRef = useRef(null); // Use useRef to reference the file input

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
        handleImageChange({ target: { files } }); // Simulate the input change event
        console.log("Image accepted:", file.name);
      } else {
        console.error("Only image files are allowed.");
      }
    }
  };

  const handleImageSelection = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      handleImageChange(e); // Call the passed-in handler
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent event propagation
    e.preventDefault(); // Prevent default behavior
  
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  const handlePrediction = async (e) => {
  e.preventDefault(); // Prevent form submission

  if (!selectedImage) {
    setPredictionResult("Please upload an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("image", selectedImage);
  console.log([...formData]); // Debug FormData

  try {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: formData,
    });

    console.log("Response status:", response.status); // Debug response status

    if (!response.ok) {
      throw new Error("Failed to fetch prediction.");
    }

    const data = await response.json();
    console.log("Response data:", data); // Debug response data
    const { prediction, confidence } = data;

    setPredictionResult(`Prediction: ${prediction}, Confidence: ${confidence}%`);
  } catch (error) {
    console.error("Error during prediction:", error);
    setPredictionResult("Error: Unable to get prediction.");
  }
};

// Update the image preview
{selectedImage ? (
  <div className={styles.imagePreview}>
    <img
      src={URL.createObjectURL(selectedImage)} // Use selectedImage
      alt="Preview"
      title="Drag new image here to replace"
    />
  </div>
) : (
  <>
    <span className={styles.drop_title}>Drop file here</span>
    or
    <div className={styles.button_wrap}>
      <input
        type="file"
        id="images"
        accept="image/*"
        required
        onChange={handleImageSelection}
        ref={fileInputRef} // Attach the ref to the input
        style={{ display: "none" }} // Hide the input element
      />
      <div
        className={styles.custom_button}
        onClick={handleButtonClick} // Use the ref-based handler
      >
        Choose File
      </div>
    </div>
  </>
)}
  return (
    <section>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.input}>
          <label
            htmlFor="images"
            className={`${styles.drop_container} ${
              dragging ? styles.dragging : ""
            }`}
            id="dropcontainer"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {selectedImage ? (
              <div className={styles.imagePreview}>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  title="Drag new image here to replace"
                />
              </div>
            ) : (
              <>
                <span className={styles.drop_title}>Drop file here</span>
                or
                <div className={styles.button_wrap}>
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    required
                    onChange={handleImageSelection}
                    ref={fileInputRef} // Attach the ref to the input
                    style={{ display: "none" }} // Hide the input element
                  />
                  <div
                    className={styles.custom_button}
                    onClick={handleButtonClick} // Use the ref-based handler
                  >
                    Choose File
                  </div>
                </div>
              </>
            )}
          </label>
          <button type="submit">Predict</button>
        </form>

        <div className={styles.about}>
          <p>
            This webapp is part of a research called <br /> <br />
            <b>
              "Leaf-Based Bitter Gourd Health Assessment Using CNN for NPK
              Deficiency Detection"{" "}
            </b>{" "}
            <br /> <br />
            which is dedicated to the farmers and agriculturists who tirelessly
            work toward ensuring food security, driving economic growth, and
            promoting sustainable development.
          </p>

          <strong>
            <p id="prediction"> {predictionResult} </p>
          </strong>
        </div>
      </div>
    </section>
  );
}

export default landingPage;