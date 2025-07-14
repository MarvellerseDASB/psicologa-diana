// 🗓️ Año en el footer
document.getElementById("anio-actual").textContent = new Date().getFullYear();

// 🌙 Activar modo oscuro automático y restaurar preferencia
window.addEventListener("load", () => {
  const hora = new Date().getHours();
  if ((hora >= 19 || hora < 7) && !localStorage.getItem("modoOscuro")) {
    document.body.classList.add("modo-oscuro");
    localStorage.setItem("modoOscuro", "true");
    actualizarTextoBotones();
  }

  if (localStorage.getItem("modoOscuro") === "true") {
    document.body.classList.add("modo-oscuro");
    actualizarTextoBotones();
  }

  // 🎬 Activar animaciones por scroll
  const elementosAnimados = document.querySelectorAll('[data-anim]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  });
  elementosAnimados.forEach(el => observer.observe(el));
});

// 🌗 Alternar modo claro/oscuro con transición
function toggleModoOscuro() {
  document.body.classList.add("transicion-tema");
  const activar = !document.body.classList.contains("modo-oscuro");
  document.body.classList.toggle("modo-oscuro", activar);
  localStorage.setItem("modoOscuro", activar ? "true" : "false");
  actualizarTextoBotones();
  setTimeout(() => {
    document.body.classList.remove("transicion-tema");
  }, 500);
}

// 🔁 Actualizar texto del botón SAT
function actualizarTextoBotones() {
  const oscuroActivo = document.body.classList.contains("modo-oscuro");
  const texto = oscuroActivo ? "☀️ Modo Claro" : "🌗 Modo Oscuro";
  const boton = document.getElementById("boton-tema");
  if (boton) boton.textContent = texto;
}

// 💡 Enlazar botón SAT
document.getElementById("boton-tema")?.addEventListener("click", toggleModoOscuro);

// 📬 Capturar formulario y generar borrador de correo
document.getElementById("formulario-agenda")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const dia = document.getElementById("dia").value;
  const horario = document.getElementById("horario").value;
  const modalidad = document.querySelector('input[name="Modalidad"]:checked')?.value || "";
  const comentario = document.getElementById("comentario").value.trim();

  const body = `
Nombre completo: ${nombre}
Correo electrónico: ${correo}
Día preferido: ${dia}
Horario preferido: ${horario}
¿Cómo prefieres la sesión?: ${modalidad}
Comentario adicional: ${comentario}`.trim();

  const mailto = `mailto:dlopezcan16@gmail.com?subject=Solicitud de cita&body=${encodeURIComponent(body)}`;
  window.open(mailto, "_blank");
});

// 🎉 Cerrar modal de confirmación (por si lo activas manualmente)
function cerrarModal() {
  const modal = document.getElementById("modal-confirmacion");
  if (modal) modal.style.display = "none";
}