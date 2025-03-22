import "@fontsource/inter";
import styles from './App.module.css';
import Header from './components/header/Header';
import LandingPage from './components/landingPage/LandingPage';
import Basis from './components/basisPage/Basis';
import Footer from "./components/footer/Footer";

function App() {
  return (
    <section className={styles.app}>
      <Header />
      <LandingPage />
      <Basis />
      <Footer />
    </section>
  )
}

export default App
