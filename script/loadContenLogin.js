function includeContent(url, targetElement) {
  var xhr = new XMLHttpRequest();
  xhr.open ('GET', url, false);  // Cambia a false para hacer la solicitud de manera síncrona
  xhr.send();

  if (xhr.readyState == 4 && xhr.status == 200) {
      targetElement.innerHTML += xhr.responseText;
  }
}

// Llamar a la función para incluir el footer cuando la página cargue
includeContent('../html/footerLogin.html', document.getElementById('footer-container'));

// Llamar a la función para incluir el encabezado cuando la página cargue
includeContent('../html/headerLogin.html', document.getElementById('header-container'));

// Cargar libros 
const elementoLibros  = document.getElementById('MostrarLibros')

if (elementoLibros !=null) {
    includeContent('../html/plantillaLibros.html', elementoLibros);
}


/* Para el dropdown */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  } 

 const temaOscuro = () => 
{
    document.querySelector("body").setAttribute("data-bs-theme", "dark");

    /* Imagen de promocion por navidad */
    if(document.getElementById("imagen")!==null)
    {
        if(document.getElementById("imagen").classList.contains('imagenContenida'))
        {
            document.getElementById("imagen").classList.remove('imagenContenida');
            document.getElementById("imagen").classList.toggle('imagenContenida2');
        }
    }

    /* Logos de header */
    document.querySelector("#logoHeader").setAttribute("src", "../img/LogoBlanco.svg");
    document.querySelector("#logoHeaderResponsive").setAttribute("src", "../img/Logo2Blanco.png");

    /*Header */
    if(document.getElementById("headerColor").classList.contains('bg-warning'))
    {
        document.getElementById("headerColor").classList.remove('bg-warning');
        document.getElementById("headerColor").classList.toggle('bg-nuevo');
    }

    /* Buscador */
    if(document.getElementById("buscador")!==null)
    {
        if(document.getElementById("buscador").classList.contains('bg-white'))
        {
            document.getElementById("buscador").classList.remove('bg-white');
            document.getElementById("buscador").classList.toggle('bg-dark');
        }
    }

    /* Footer */
    if(document.getElementById("footerColor").classList.contains('bg-warning'))
    {
        document.getElementById("footerColor").classList.remove('bg-warning');
        document.getElementById("footerColor").classList.toggle('bg-nuevo');
    }
    
    document.querySelector("#dl-icon").setAttribute("xlink:href", "../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#brightness-high-fill");
}

const temaClaro = () => 
{
    document.querySelector("body").setAttribute("data-bs-theme", "light");

    /* Imagen de promocion por navidad */
    if(document.getElementById("imagen")!==null)
    {
        if (document.getElementById("imagen").classList.contains('imagenContenida2'))
        {
            document.getElementById("imagen").classList.remove('imagenContenida2');
            document.getElementById("imagen").classList.toggle('imagenContenida');
        }
    }

    /* Logo de header */
    document.querySelector("#logoHeader").setAttribute("src", "../img/LogoCafe.svg");
    document.querySelector("#logoHeaderResponsive").setAttribute("src", "../img/Logo2Cafe.png");

     /* Header */
     if(document.getElementById("headerColor").classList.contains('bg-nuevo'))
     {
         document.getElementById("headerColor").classList.remove('bg-nuevo');
         document.getElementById("headerColor").classList.toggle('bg-warning');
     }

    /* Buscador */
    if(document.getElementById("buscador")!==null)
    {
        if(document.getElementById("buscador").classList.contains('bg-dark'))
        {
            document.getElementById("buscador").classList.remove('bg-dark');
            document.getElementById("buscador").classList.toggle('bg-white');
        }
    }

    /* Footer */
    if(document.getElementById("footerColor").classList.contains('bg-nuevo'))
    {
        document.getElementById("footerColor").classList.remove('bg-nuevo');
        document.getElementById("footerColor").classList.toggle('bg-warning');
    }

    document.querySelector("#dl-icon").setAttribute("xlink:href", "../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#moon-stars-fill");
} 


  const cambiarTema = (tema) => {
    if (tema === 'oscuro') {
        temaOscuro();
    } else {
        temaClaro();
    }
}

// Al cargar la página, verifica si hay una preferencia almacenada en el localStorage
document.addEventListener("DOMContentLoaded", () => {
    const temaGuardado = localStorage.getItem('tema');

    if (temaGuardado) {
        cambiarTema(temaGuardado);
    } else {
        // Si no hay preferencia almacenada, verifica la preferencia del sistema y aplica el tema correspondiente
        const modoOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const modo = modoOscuro ? 'oscuro' : 'claro'
        cambiarTema(modo);
        localStorage.setItem("tema", modo);

    }
});

const modalModoOscuro = () => {
    // Aquí puedes añadir lógica para mostrar un modal o realizar otras acciones relacionadas con el modo oscuro
}

// Actualiza el tema si cambian las preferencias del sistema
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        const modoOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const modo = modoOscuro ? 'oscuro' : 'claro'
        cambiarTema(modo);
        localStorage.setItem("tema", modo);
});

// Función para que el usuario cambie manualmente el tema y lo guarde en el localStorage
const cambiarTemaManual = () => {
  const temaActual = document.querySelector("body").getAttribute("data-bs-theme");
  // Verificar si el tema actual es "light"
  if (temaActual === "light") {
      // Guardar en localStorage que se cambio a tema oscuro
      cambiarTema('oscuro');
      localStorage.setItem("tema", "oscuro");
  } else {
      // Guardar en localStorage sque se cambio a tema claro
      localStorage.setItem("tema", "claro");
      cambiarTema('claro');
  
  }
}