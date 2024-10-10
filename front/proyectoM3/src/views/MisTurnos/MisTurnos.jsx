import { useEffect, useCallback } from "react";
import Turno from "../../components/Turno/Turno";
import axios from "axios";
import style from "./MisTurnos.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAppointments, cancelAppointment } from "../../redux/reducer";

const MisTurnos = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userActive);
  const appointments = useSelector((state) => state.user.userAppointments);

  const fetchData = useCallback(async () => {
    if (user && user.id) {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${user.id}`
        );
        dispatch(addAppointments(response.data.appointment));
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCancel = (id) => {
    dispatch(cancelAppointment(id));
  };

  return (
    <>
      <h1 className={style.titulo}>Lista de turnos</h1>
      <div>
        {appointments.length ? (
          appointments.map((appointment) => {
            return (
              <Turno
                key={appointment.id}
                id={appointment.id}
                time={appointment.time}
                date={appointment.date}
                status={appointment.status}
                description={appointment.description}
                onCancel={handleCancel}
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

export default MisTurnos;
