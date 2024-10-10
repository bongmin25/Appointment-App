import styles from "./Turno.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Turno = ({ id, date, time, status, description, onCancel }) => {
  const [localStatus, setLocalStatus] = useState(status);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/appointments/${id}`
        );
        setLocalStatus(response.data.status.toUpperCase());
      } catch (error) {
        console.log(error);
      }
    };

    fetchStatus();
  }, [id]);
  const cancelHandler = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/appointments/cancel/${id}`
      );
      if (response.status === 200) {
        setLocalStatus("CANCELED");
        onCancel(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusColor = localStatus === "ACTIVE" ? "green" : "red";
  return (
    <div className={styles.contenedorTurnos}>
      <div className={styles.info}>
        <div className={styles.subtitle}>Turno N°:</div>
        <p>{id}</p>
        <div className={styles.subtitle}>Fecha:</div>
        <p>{date}</p>
        <div className={styles.subtitle}>Hora:</div>
        <p>{time}</p>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.status} style={{ color: statusColor }}>
          {localStatus}
        </div>
        <div className={styles.description}>{description}</div>
        <button onClick={cancelHandler} className={styles.turnoButton}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default Turno;
