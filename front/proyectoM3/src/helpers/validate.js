export const validateRegister = (formData) => {
  const errors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;
  const usernameRegex = /.+/;
  const dniRegex = /^\d+$/;
  const nameRegex = /.+/;
  const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;

  // Validaciones
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = "El email es obligatorio y debe tener un formato válido";
  }
  if (!formData.name || !nameRegex.test(formData.name)) {
    errors.name = "El nombre es obligatorio";
  }
  if (!formData.username || !usernameRegex.test(formData.username)) {
    errors.username = "El nombre de usuario es obligatorio";
  }
  if (!formData.password || !passwordRegex.test(formData.password)) {
    errors.password =
      "La contraseña es obligatoria y debe tener al menos 6 caracteres";
  }
  if (!formData.birthdate || !birthdateRegex.test(formData.birthdate)) {
    errors.birthdate = "La fecha de nacimiento es obligatoria";
  }
  if (!formData.nDni || !dniRegex.test(formData.nDni)) {
    errors.nDni = "El DNI es obligatorio y solo puede contener números";
  }

  return errors;
};

export const validateLogin = (formData) => {
  const errors = {};
  const usernameRegex = /.+/;
  const passwordRegex = /^.{6,}$/;

  if (!formData.username || !usernameRegex.test(formData.username)) {
    errors.username = "Usuario incorrecto";
  }

  if (!formData.password || !passwordRegex.test(formData.password)) {
    errors.password = "Contraseña incorrecta";
  }
  return errors;
};
export const validateNewAppointment = (formData) => {
  const errors = {};

  // Regex para validar que la fecha sea un día entre lunes y viernes
  const dateRegex = /^(Mon|Tue|Wed|Thu|Fri)$/;

  if (formData.date) {
    const date = new Date(formData.date);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayString = daysOfWeek[date.getUTCDay()];

    if (!dateRegex.test(dayString)) {
      errors.date = "La fecha debe ser un día entre LUN y VIE";
    }
  } else {
    errors.date = "Este campo es obligatorio";
  }

  const timeRegex = /.+/;
  const descriptionRegex = /.+/;

  if (!formData.time || !timeRegex.test(formData.time)) {
    errors.time = "Este campo es obligatorio";
  }

  if (!formData.description || !descriptionRegex.test(formData.description)) {
    errors.description = "Este campo es obligatorio";
  }

  return errors;
};
