function includeContent(url, targetElement) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            targetElement.innerHTML += xhr.responseText;
        }
    };
    xhr.send();
}

// Llamar a la función para incluir el footer cuando la página cargue
window.onload = includeContent('../html/footerLogin.html', document.getElementById('footer-container'));
// Llamar a la función para incluir el encabezado cuando la página cargue
window.onload = includeContent('../html/headerLogin.html', document.getElementById('header-container'));

//cargarLibros cuando no esta registrado
window.onload = includeContent('../html/plantillaLibros.html', document.getElementById('MostrarLibros'));

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