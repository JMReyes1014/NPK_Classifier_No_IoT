import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.contact}>
        <h1>Contact Me: </h1>
        <ul>
          <li>
            <a href="mailto:jama10292001@gmail.com" target="_blank">
              <img src="src/assets/contact/emailIcon.png" alt="email" />
            </a>
          </li>
          <li>
            <a href="https://github.com/JMReyes1014" target="_blank">
              <img src="src/assets/contact/githubIcon.png" alt="github" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/john-michael-reyes-543093356/" target="_blank">
              <img src="src/assets/contact/linkedinIcon.png" alt="linkedin" />
            </a>
          </li>
        </ul>
      </div>

      <p>All rights reserved @ 2025</p>
    </footer>
  );
}

export default Footer;
