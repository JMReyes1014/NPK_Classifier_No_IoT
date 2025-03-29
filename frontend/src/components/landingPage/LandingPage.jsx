import React, { useState, useRef, useEffect } from "react";
import styles from "./landingPage.module.css";

function landingPage({
  handleSubmit,
  handleImageChange,
  image,
  prediction,
  confidence,
}) {
  const [dragging, setDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(
    "⬅️ Click to Predict"
  );
  const [loading, setLoading] = useState(false); // New state for loading animation
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Update predictionResult when prediction or confidence changes
    if (prediction && confidence !== null) {
      setPredictionResult(
        prediction && confidence !== null
          ? `Prediction: ${prediction}, Confidence: ${Math.floor(confidence)}%`
          : "Prediction failed. Please try again."
      );
      setLoading(false); // Stop loading when prediction is updated
    }
  }, [prediction, confidence]);

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

  const handleReset = () => {
    setSelectedImage(null);
    setPredictionResult("⬅️ Click to Predict");
    handleImageChange({ target: { files: [] } }); // Reset the image in parent state

    // Apply the .reset styling to the <p> inside <strong>
    const predictionElement = document.getElementById("prediction");
    if (predictionElement) {
      predictionElement.className = styles.reset; // Apply the .reset class
    }
  };

  const handlePrediction = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!selectedImage) {
      setPredictionResult("Please upload an image first.");
      return;
    }

    setLoading(true); // Start loading animation

    try {
      // Use the handleSubmit function passed as a prop
      await handleSubmit(e);

      // Update the prediction result based on props
      setPredictionResult(
        prediction && confidence !== null
          ? `Prediction: ${prediction}, Confidence: ${Math.round(confidence)}%`
          : "Prediction failed. Please try again."
      );
    } catch (error) {
      setPredictionResult(
        error.response?.data?.error_message ||
          "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading after prediction
    }
  };

  return (
    <section>
      <div className={styles.container}>
        <form
          onSubmit={selectedImage && !loading ? handlePrediction : undefined}
          className={styles.input}
        >
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
          {!loading && predictionResult !== "⬅️ Click to Predict" ? (
            <button type="button" onClick={handleReset} className={styles.custom_button}>
              Reset
            </button>
          ) : (
            <button type="submit" disabled={loading}>
              {loading ? "Predicting..." : "Predict"}
            </button>
          )}
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
            <p
              id="prediction"
              className={`${styles.predictionResult} ${
                prediction && confidence !== null
                  ? styles.updatedPrediction
                  : ""
              }`}
            >
              {loading ? "Processing..." : predictionResult}
            </p>
          </strong>
        </div>
      </div>
    </section>
  );
}

export default landingPage;
