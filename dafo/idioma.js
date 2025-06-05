let en = false; 

    function cambiarIdioma() {
      en = !en; 

      if (en) {
        document.getElementById("titulo").textContent = "SWOT Analysis";

        document.getElementById("header-fortalezas").textContent = "Strengths";
        document.getElementById("header-oportunidades").textContent = "Opportunities";
        document.getElementById("header-debilidades").textContent = "Weaknesses";
        document.getElementById("header-amenazas").textContent = "Threats";

        document.getElementById("cambiar-idioma").textContent = "Cambiar a Español";

        document.getElementById("lista-fortalezas").innerHTML = `
          <li>Some programming skills</li>
          <li>HTML</li>
          <li>A bit of computer systems</li>
        `;

        document.getElementById("lista-oportunidades").innerHTML = `
          <li>Learn how a City Council works</li>
          <li>Learn from my colleagues</li>
        `;
 
        document.getElementById("lista-debilidades").innerHTML = `
          <li>I learn a bit slowly</li>
          <li>Repeat a couple of times for it to stick</li>
        `;

        document.getElementById("lista-amenazas").innerHTML = `
          <li>People more competent than me</li>
          <li>0000000</li>
        `;
      } else {
        document.getElementById("titulo").textContent = "Análisis DAFO";

        document.getElementById("header-fortalezas").textContent = "Fortalezas";
        document.getElementById("header-oportunidades").textContent = "Oportunidades";
        document.getElementById("header-debilidades").textContent = "Debilidades";
        document.getElementById("header-amenazas").textContent = "Amenazas";

        document.getElementById("cambiar-idioma").textContent = "Cambiar a Inglés";

        document.getElementById("lista-fortalezas").innerHTML = `
          <li>Algo de programacion</li>
          <li>Html</li>
          <li>Un poco de sistemas informatico</li>
        `;

        document.getElementById("lista-oportunidades").innerHTML = `
          <li>Aprender de como funciona un Ayuntamiento</li>
          <li>Aprender de mis compañeros</li>
        `;

        document.getElementById("lista-debilidades").innerHTML = `
          <li>Aprendo un poco lento</li>
          <li>Repetir una o dos veces para que se me quede</li>
        `;

        document.getElementById("lista-amenazas").innerHTML = `
          <li>Gente mas competente que yo</li>
          <li>0000000</li>
        `;
      }
    }