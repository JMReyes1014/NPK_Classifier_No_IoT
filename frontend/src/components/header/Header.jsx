import React from 'react'
import styles from './header.module.css'

function Header() {
  return (
    <header className={styles.container}>
        <div>
            <img src="src/assets/landingPage/NPKnows.png" alt="NPKnows" />
        </div>
    </header>
  )
}

export default Header