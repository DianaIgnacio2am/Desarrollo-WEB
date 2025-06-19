// validacion.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("subscriptionForm");
  const fields = {
    name: {
      validate: val => /^.{7,}$/.test(val) && val.includes(" "),
      message: "Debe tener más de 6 letras y al menos un espacio."
    },
    email: {
      validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      message: "Debe ser un email válido."
    },
    password: {
      validate: val => /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(val),
      message: "Al menos 8 caracteres con letras y números."
    },
    repeatPassword: {
      validate: val => val === document.getElementById("password").value,
      message: "Ambas contraseñas deben ser iguales."
    },
    age: {
      validate: val => parseInt(val) >= 18,
      message: "Debes ser mayor o igual a 18."
    },
    phone: {
      validate: val => /^\d{7,}$/.test(val),
      message: "Debe tener al menos 7 dígitos, sin espacios ni símbolos."
    },
    address: {
      validate: val => /^.*\s.*$/.test(val) && val.length >= 5,
      message: "Al menos 5 caracteres con un espacio."
    },
    city: {
      validate: val => val.length >= 3,
      message: "Debe tener al menos 3 caracteres."
    },
    postal: {
      validate: val => val.length >= 3,
      message: "Debe tener al menos 3 caracteres."
    },
    dni: {
      validate: val => /^\d{7,8}$/.test(val),
      message: "Debe tener 7 u 8 dígitos."
    }
  };

  const formTitle = document.getElementById("formTitle");
  const nameInput = document.getElementById("name");

  nameInput.addEventListener("input", () => {
    formTitle.textContent = `HOLA ${nameInput.value}`;
  });

  for (const fieldId in fields) {
    const input = document.getElementById(fieldId);
    const errorDiv = document.getElementById(`error-${fieldId}`);

    input.addEventListener("blur", () => {
      const { validate, message } = fields[fieldId];
      const valid = validate(input.value);
      errorDiv.textContent = valid ? "" : message;
      input.style.borderColor = valid ? "green" : "red";
    });

    input.addEventListener("focus", () => {
      errorDiv.textContent = "";
      input.style.borderColor = "";
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let hasError = false;
    let message = "Datos ingresados:\n";

    for (const fieldId in fields) {
      const input = document.getElementById(fieldId);
      const errorDiv = document.getElementById(`error-${fieldId}`);
      const { validate, message: errorMsg } = fields[fieldId];
      const valid = validate(input.value);

      if (!valid) {
        errorDiv.textContent = errorMsg;
        input.style.borderColor = "red";
        hasError = true;
      } else {
        message += `${fieldId}: ${input.value}\n`;
      }
    }

    alert(hasError ? "Hay errores en el formulario. Revisa los campos." : message);
  });
});
