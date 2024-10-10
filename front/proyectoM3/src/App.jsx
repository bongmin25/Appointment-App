import styles from "./App.module.css";
import Home from "./views/Home/Home";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Routes, Route, useLocation } from "react-router-dom";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import Contact from "./views/Contact/Contact";
import About from "./views/About/About";
import NewAppointment from "./views/NewAppointments/NewAppointments";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" || location.pathname === "/register" ? null : (
        <NavBar />
      )}

      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames={{
            enter: styles.pageEnter,
            enterActive: styles.pageEnterActive,
            exit: styles.pageExit,
            exitActive: styles.pageExitActive,
          }}
          unmountOnExit
        >
          <div className={styles.transitionContainer}>
            <Routes location={location}>
              <Route path="/home" element={<Home />} />
              <Route path="/misTurnos" element={<MisTurnos />} />
              <Route path="/register" element={<Register />} />
              <Route path="/newAppointment" element={<NewAppointment />} />
              <Route path="/" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;
