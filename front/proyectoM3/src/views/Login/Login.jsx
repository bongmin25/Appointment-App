import { useState } from "react";
import { validateLogin } from "../../helpers/validate";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/veterinaria.jpg";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/reducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    username: "",
    password: "",
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
        "http://localhost:3000/users/login",
        form
      );

      if (response.status === 200) {
        alert("Usuario logueado correctamente");
        dispatch(addUser(response.data.user)); // Aquí despachamos el usuario correcto
        navigate("/home");
      } else {
        alert("Ha ocurrido un error");
      }
    } catch (error) {
      console.log(error);
      setErrors({
        ...errors,
        backend: error.response?.data?.message || "Error desconocido",
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (submitted) {
      const updatedErrors = validateLogin({
        ...form,
        [name]: value,
      });
      setErrors(updatedErrors);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    const validationErrors = validateLogin(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await postData();
    }
  };

  return (
    <>
      <h1 className={style.logInTitle}>
        Bienvenid@ a Veterinaria Buenos Aires
      </h1>
      <img className={style.logo} src={logo} />
      <h2 className={style.formTitle}>Log in</h2>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label>Usuario: </label>
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
          <p
            className={`${style.errorMessage} ${
              submitted && errors.backend ? style.show : ""
            }`}
          >
            {errors.backend}
          </p>
        </div>
        <button disabled={!isFormComplete()} className={style.submitButton}>
          Ingresar
        </button>
      </form>
      <Link className={style.register} to="register">
        Registrarse
      </Link>
    </>
  );
};

export default Login;
