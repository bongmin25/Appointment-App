import { Link } from "react-router-dom";
import style from "./Home.module.css";
import { useState } from "react";
import Testimonios from "../../components/Testimonios/Testimonio";
import testimonios from "../../helpers/testimonios";

const Home = () => {
  const [testimonio, setTestimonio] = useState(testimonios);
  console.log(setTestimonio);
  return (
    <>
      <h1 className={style.titulo}>Testimonios de nuestros clientes</h1>

      <div className={style.contenedorTestimonios}>
        {testimonio?.length ? (
          testimonio.map((testimonio) => {
            return (
              <Testimonios
                key={testimonio.id}
                id={testimonio.id}
                img={testimonio.img}
                name={testimonio.name}
                description={testimonio.description}
              />
            );
          })
        ) : (
          <div className={style.noData}>
            No se encuentran turnos registrados
          </div>
        )}
      </div>
      <div className={style.sheduleContainer}>
        <Link to="/newAppointment" className={style.scheduleButton}>
          Agendar Cita
        </Link>
      </div>
    </>
  );
};

export default Home;
