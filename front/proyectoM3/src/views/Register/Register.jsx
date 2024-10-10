import { useState } from "react";
import { validateRegister } from "../../helpers/validate";
import style from "./Register.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    username: "",
    password: "",
    email: "",
    birthdate: "",
    nDni: "",
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isFormComplete = () => {
    return Object.values(form).every((value) => value.trim() !== "");
  };

  const postData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        form
      );
      if (response.status === 200) {
        alert("Usuario registrado correctamente");
      } else {
        alert("Ha ocurrido un error");
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
      const updatedErrors = validateRegister({
        ...form,
        [name]: value,
      });
      setErrors(updatedErrors);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const validationErrors = validateRegister(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      postData();
    }
    navigate("/");
  };

  return (
    <>
      <h2 className={style.formTitle}>Formulario de Registro</h2>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label>Nombre y Apellido: </label>
          <input
            value={form.name}
            name="name"
            type="text"
            onChange={handleChange}
          />
          <p
            className={`${style.errorMessage} ${
              submitted && errors.name ? style.show : ""
            }`}
          >
            {errors.name}
          </p>
        </div>
        <div className={style.formGroup}>
          <label>Nombre de usuario: </label>
          <input
            value={form.username}
            name="username"
            type="text"
            onChange={handleChange}
          />
          <p
            className={`${style.errorMessage} ${
              submitted && errors.username ? style.show : ""
            }`}
          >
            {errors.username}
          </p>
        </div>
        <div className={style.formGroup}>
          <label>Contraseña: </label>
          <input
            value={form.password}
            name="password"
            type="password"
            onChange={handleChange}
          />
          <p
            className={`${style.errorMessage} ${
              submitted && errors.password ? style.show : ""
            }`}
          >
            {errors.password}
          </p>
        </div>
        <div className={style.formGroup}>
          <label>Email: </label>
          <input
            value={form.email}
            name="email"
            type="text"
            onChange={handleChange}
          />
          <p
            className={`${style.errorMessage} ${
              submitted && errors.email ? style.show : ""
            }`}
          >
            {errors.email}
          </p>
        </div>
        <div className={style.formGroup}>
          <label>Fecha de nacimiento: </label>
          <input
            value={form.birthdate}
            name="birthdate"
            type="date"
            onChange={handleChange}
          />
          <p
            className={`${style.errorMessage} ${
              submitted && errors.birthdate ? style.show : ""
            }`}
          >
            {errors.birthdate}
          </p>
        </div>
        <div className={style.formGroup}>
          <label>Numero de DNI: </label>
          <input
            value={form.nDni}
            name="nDni"
            type="text"
            onChange={handleChange}
          />
          <p
            className={`${style.errorMessage} ${
              submitted && errors.nDni ? style.show : ""
            }`}
          >
            {errors.nDni}
          </p>
        </div>
        <button disabled={!isFormComplete()} className={style.submitButton}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Register;
