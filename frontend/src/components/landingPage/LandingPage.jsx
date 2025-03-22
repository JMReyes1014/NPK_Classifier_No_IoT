import React, { useState } from "react";
import styles from "./landingPage.module.css";

function landingPage() {
  const [dragging, setDragging] = useState(false);

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
    if (files.length) {
      document.getElementById("images").files = files;
      console.log("Image accepted:", files[0].name);
    }
  };

  return (
    <section>
      <div className={styles.container}>
        <form className={styles.input}>
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
            <span className={styles.drop_title}>Drop file here</span>
            or
            <div className={styles.button_wrap}>
              <input type="file" id="images" accept="image/*" required />
              <div
                className={styles.custom_button}
                onClick={() => document.getElementById("images").click()}
              >
                Choose File
              </div>
            </div>
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
            <p id="prediction"> ⬅️ Click to Predict </p>
          </strong>
        </div>
      </div>
    </section>
  );
}

export default landingPage;
