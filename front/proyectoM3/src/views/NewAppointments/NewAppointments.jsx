import { useState } from "react";
import { useSelector } from "react-redux";
import { validateNewAppointment } from "../../helpers/validate";
import style from "./NewAppointments.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewAppointment = () => {
  const navigate = useNavigate();
  const initialState = {
    date: "",
    time: "",
    description: "",
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isFormComplete = () => {
    return Object.values(form).every((value) => value.trim() !== "");
  };
  const user = useSelector((state) => state.user.userActive);
  const postData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/appointments/schedule",
        {
          ...form,
          userId: user.id,
        }
      );

      if (response.status === 200) {
        alert("Turno registrado correctamente");
        navigate("/misTurnos");
      } else {
        alert("Ha ocurrido un error, intentelo de nuevo por favor");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (submitted) {
      const updatedErrors = validateNewAppointment({
        ...form,
        [name]: value,
      });
      setErrors(updatedErrors);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const validationErrors = validateNewAppointment(form);
    setErrors(validationErrors);

 
    if (validationErrors.date === "La fecha debe ser un día entre LUN y VIE") {
      alert("La fecha debe ser un día entre LUN y VIE");
    }

    if (Object.keys(validationErrors).length === 0) {
      postData();
    }
  };

  return (
    <>
      <h2 className={style.formTitle}>Nueva Agenda </h2>
      <h4 className={style.formTitle}>Atención 24 hs de LUN a VIE</h4>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label>Hora: </label>
          <input
            value={form.time}
            name="time"
            type="time"
            onChange={handleChange}
          />
          <p
            className={`${style.errorMessage} ${
              submitted && errors.time ? style.show : ""
            }`}
          >
            {errors.time}
          </p>
        </div>
        <div className={style.formGroup}>
          <label>Fecha: </label>
          <input
            value={form.date}
            name="date"
            type="date"
            onChange={handleChange}
          />
          <p
            className={`${style.errorMessage} ${
              submitted && errors.date ? style.show : ""
            }`}
          >
            {errors.date}
          </p>
        </div>
        <div className={style.formGroup}>
          <label>Descripcion: </label>
          <input
            placeholder="Agregue un comentario de la causa del turno"
            value={form.description}
            name="description"
            type="string"
            onChange={handleChange}
          />
          <p
            className={`${style.errorMessage} ${
              submitted && errors.description ? style.show : ""
            }`}
          >
            {errors.description}
          </p>
        </div>
        <button disabled={!isFormComplete()} className={style.submitButton}>
          Submit
        </button>
      </form>
    </>
  );
};

export default NewAppointment;
