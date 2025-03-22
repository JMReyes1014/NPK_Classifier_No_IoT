import React from 'react'
import styles from './Basis.module.css'
import LeafCard from '../leafCard/LeafCard'

function Basis() {
  return (
    <section className={styles.container}>
        <h1>NPK Deficiency Basis</h1>
        <div className={styles.leafContainer}>
          <LeafCard path={"src/assets/basisPage/Healthy.jpg"} title={"Healthy"} description={"Healthy bitter gourd leaves are vibrant green, firm, smooth, free from pests and diseases, and consistent in size and shape."} />
          <LeafCard path={"src/assets/basisPage/Nitrogen.jpg"} title={"N - Deficient"} description={"This deficiency in bitter gourd causes older leaves  to turn yellow (chlorosis), starting at the tips and spreading across the leaf due to reduced  chlorophyll."} />
          <LeafCard path={"src/assets/basisPage/Phosphorus.jpg"} title={"P - Deficient"} description={"This deficiency in plants is characterized by  purpling or darkening of leaves, especially on the underside, with older leaves turning  dark green or showing purple veins."} />
          <LeafCard path={"src/assets/basisPage/Potassium.jpg"} title={"K - Deficient"} description={" This deficiency causes yellowing (chlorosis) at  the edges of older leaves, followed by browning or scorching (necrosis) of the margins  and tips."} />
        </div>
    </section>
  )
}

export default Basis