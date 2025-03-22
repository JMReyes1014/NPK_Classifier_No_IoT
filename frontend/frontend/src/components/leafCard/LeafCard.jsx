import React from 'react'
import styles from './LeafCard.module.css'

function LeafCard({ title, description }) {
  return (
    <div className={styles.container}>
        <div className={styles.leafImgContainer}>
            <img className={styles.image} src="src/assets/basisPage/Healthy.jpg" alt="Healthy-Leaf" />
            <label htmlFor="leafImg">{title}</label>
        </div>
        <p>
          {description}
        </p>
    </div>
  )
}

export default LeafCard