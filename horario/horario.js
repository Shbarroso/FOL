const trabajadores = {
    carlos: "Carlos Pérez",
    maria: "María López",
    jose: "José Martínez",
    lucia: "Lucía Torres"
  };

  const textos = {
    es: {
      titulo: "Control de Horarios",
      nombre: "Nombre",
      acciones: "Acciones",
      entrada: "Fichar Entrada",
      salida: "Fichar Salida",
      historial: "Historial de Fichajes",
      activos: "🟢 Trabajadores en turno:",
      sinActivos: "🔴 No hay trabajadores en turno.",
      mensajeEntrada: nombre => `✅ ${nombre} fichó su entrada`,
      mensajeSalida: nombre => `🕒 ${nombre} fichó su salida`
    },
    en: {
      titulo: "Work Time Tracker",
      nombre: "Name",
      acciones: "Actions",
      entrada: "Clock In",
      salida: "Clock Out",
      historial: "Clock History",
      activos: "🟢 Active workers:",
      sinActivos: "🔴 No workers currently clocked in.",
      mensajeEntrada: name => `✅ ${name} clocked in`,
      mensajeSalida: name => `🕒 ${name} clocked out`
    }
  };

  let idioma = "es";

  function setIdioma(id) {
    idioma = id;
    document.getElementById("titulo").textContent = textos[idioma].titulo;
    document.getElementById("th-nombre").textContent = textos[idioma].nombre;
    document.getElementById("th-acciones").textContent = textos[idioma].acciones;
    document.querySelectorAll("button.action").forEach(btn => {
      if (btn.textContent.includes("Entrada") || btn.textContent.includes("Clock In")) {
        btn.textContent = textos[idioma].entrada;
      } else {
        btn.textContent = textos[idioma].salida;
      }
    });
    document.getElementById("titulo-historial").textContent = textos[idioma].historial;
    mostrarActivos();
    mostrarHistorial();
  }

  function getHoraActual() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function getFechaActual() {
    const now = new Date();
    return now.toLocaleDateString();
  }

  function ficharEntrada(nombre) {
    const hora = getHoraActual();
    localStorage.setItem(`entrada-${nombre}`, hora);
    mostrarMensaje(textos[idioma].mensajeEntrada(trabajadores[nombre]));
    mostrarActivos();
  }

  function ficharSalida(nombre) {
    const horaSalida = getHoraActual();
    const horaEntrada = localStorage.getItem(`entrada-${nombre}`);

    if (!horaEntrada) {
      alert(idioma === "es" ? "⚠️ Primero debes fichar la entrada." : "⚠️ You must clock in first.");
      return;
    }

    const fecha = getFechaActual();
    const registro = {
      fecha: fecha,
      entrada: horaEntrada,
      salida: horaSalida
    };

    let historial = JSON.parse(localStorage.getItem(`historial-${nombre}`)) || [];
    historial.push(registro);
    localStorage.setItem(`historial-${nombre}`, JSON.stringify(historial));
    localStorage.removeItem(`entrada-${nombre}`);

    mostrarMensaje(textos[idioma].mensajeSalida(trabajadores[nombre]));
    mostrarActivos();
    mostrarHistorial();
  }

  function mostrarMensaje(msg) {
    const div = document.getElementById("mensaje");
    div.textContent = msg;
    setTimeout(() => div.textContent = "", 4000);
  }

  function mostrarActivos() {
    const div = document.getElementById("activos");
    const activos = Object.keys(trabajadores).filter(nombre => localStorage.getItem(`entrada-${nombre}`));
    if (activos.length > 0) {
      div.innerHTML = `<strong>${textos[idioma].activos}</strong><br>` +
        activos.map(n => `👤 ${trabajadores[n]} (${localStorage.getItem(`entrada-${n}`)})`).join("<br>");
    } else {
      div.innerHTML = `<strong>${textos[idioma].sinActivos}</strong>`;
    }
  }

  function mostrarHistorial() {
    const contenedor = document.getElementById("historial");
    contenedor.innerHTML = `<h2 id="titulo-historial">${textos[idioma].historial}</h2>`;

    for (const nombre in trabajadores) {
      const historial = JSON.parse(localStorage.getItem(`historial-${nombre}`)) || [];
      if (historial.length > 0) {
        const div = document.createElement("div");
        div.className = "registro";
        div.innerHTML = `<strong>${trabajadores[nombre]}</strong><br>` +
          historial.map(r => `📅 ${r.fecha} — ${textos[idioma].entrada}: ${r.entrada} | ${textos[idioma].salida}: ${r.salida}`).join("<br>");
        contenedor.appendChild(div);
      }
    }
  }

  window.onload = () => {
    mostrarActivos();
    mostrarHistorial();
  };