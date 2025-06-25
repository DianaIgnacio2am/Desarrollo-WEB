
// Espera a que cargue todo el DOM
window.onload = function () {
  const form = document.getElementById("subscriptionForm");
  const title = document.getElementById("formTitle");
  const inputs = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    repeatPassword: document.getElementById("repeatPassword"),
    age: document.getElementById("age"),
    phone: document.getElementById("phone"),
    address: document.getElementById("address"),
    city: document.getElementById("city"),
    postal: document.getElementById("postal"),
    dni: document.getElementById("dni"),
  };

  const errors = {};

  // Carga datos del localStorage
  const stored = JSON.parse(localStorage.getItem("formData"));
  if (stored) {
    for (const key in stored) {
      if (inputs[key]) {
        inputs[key].value = stored[key];
      }
    }
    title.textContent = "HOLA " + (stored.name || "");
  }

  // Título dinámico
  inputs.name.addEventListener("input", () => {
    title.textContent = "HOLA " + inputs.name.value.toUpperCase();
  });

  // Validaciones
  const validators = {
    name: (v) => v.length > 6 && v.includes(" ") || "Debe tener más de 6 letras y al menos un espacio.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Debe ser un email válido.",
    password: (v) => /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) || "Al menos 8 caracteres, con letras y números.",
    repeatPassword: (v) => v === inputs.password.value || "Las contraseñas no coinciden.",
    age: (v) => parseInt(v) >= 18 || "Debe ser mayor o igual a 18.",
    phone: (v) => /^\d{7,}$/.test(v) || "Mínimo 7 dígitos, sin espacios ni símbolos.",
    address: (v) => v.length >= 5 && /\d/.test(v) && /[a-zA-Z]/.test(v) && v.includes(" ") || "Debe tener letras, números y un espacio.",
    city: (v) => v.length >= 3 || "Debe tener al menos 3 caracteres.",
    postal: (v) => v.length >= 3 || "Debe tener al menos 3 caracteres.",
    dni: (v) => /^\d{7,8}$/.test(v) || "Debe tener 7 u 8 dígitos.",
  };

  // Asignar eventos
  for (const key in inputs) {
    const input = inputs[key];
    const errorDiv = document.getElementById("error-" + key);
    input.addEventListener("blur", () => {
      const value = input.value.trim();
      const result = validators[key](value);
      if (result !== true) {
        errorDiv.textContent = result;
        input.classList.add("invalid");
        errors[key] = result;
      } else {
        errorDiv.textContent = "";
        input.classList.remove("invalid");
        delete errors[key];
      }
    });
    input.addEventListener("focus", () => {
      errorDiv.textContent = "";
    });
  }

  // Modal
  const createModal = (msg) => {
    let existing = document.getElementById("modal");
    if (existing) existing.remove();
    const modal = document.createElement("div");
    modal.id = "modal";
    modal.style.position = "fixed";
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.6)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.innerHTML = '<div style="background:white;padding:20px;border-radius:8px;max-width:500px;text-align:center"><p>' + msg + '</p><button onclick="document.getElementById(\'modal\').remove()">Cerrar</button></div>';
    document.body.appendChild(modal);
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Forzar blur para validar todos
    Object.values(inputs).forEach((input) => input.dispatchEvent(new Event("blur")));

    if (Object.keys(errors).length > 0) {
      createModal("Errores en el formulario: " + Object.values(errors).join(" | "));
      return;
    }

    const formData = {};
    const queryParams = [];
    for (const key in inputs) {
      formData[key] = inputs[key].value.trim();
      queryParams.push(key + "=" + encodeURIComponent(inputs[key].value.trim()));
    }

   const url = `http://curso-dev-2021.herokuapp.com/newsletter?${params.toString()}`;



    fetch(url)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("formData", JSON.stringify(formData));
        createModal("Suscripción exitosa. Datos recibidos: " + JSON.stringify(data));
      })
      .catch(error => {
        createModal("Error al enviar datos: " + error.message);
      });
  });
};
