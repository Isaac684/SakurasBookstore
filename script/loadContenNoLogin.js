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
window.onload = includeContent('../html/footerNoLogin.html', document.getElementById('footer-container'));

// Llamar a la función para incluir el encabezado cuando la página cargue
window.onload = includeContent('../html/headerNoLogin.html', document.getElementById('header-container'));