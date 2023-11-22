const temaOscuro = () => 
{
    document.querySelector("body").setAttribute("data-bs-theme", "dark");

    /* Imagen de promocion por navidad */
    if(document.getElementById("imagen").classList.contains('imagenContenida'))
    {
        document.getElementById("imagen").classList.remove('imagenContenida');
        document.getElementById("imagen").classList.toggle('imagenContenida2');
    }

     /* Logo de header */
    document.querySelector("#logoHeader").setAttribute("src", "../img/LogoBlanco.svg");

    /*Header */
    if(document.getElementById("headerColor").classList.contains('bg-warning'))
    {
        document.getElementById("headerColor").classList.remove('bg-warning');
        document.getElementById("headerColor").classList.toggle('bg-info');
    }

    /* Buscador */
    if(document.getElementById("buscador").classList.contains('bg-white'))
    {
        document.getElementById("buscador").classList.remove('bg-white');
        document.getElementById("buscador").classList.toggle('bg-dark');
    }

    /* Footer */
    if(document.getElementById("footerColor").classList.contains('bg-warning'))
    {
        document.getElementById("footerColor").classList.remove('bg-warning');
        document.getElementById("footerColor").classList.toggle('bg-primary');
    }
    
    document.querySelector("#dl-icon").setAttribute("xlink:href", "../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#brightness-high-fill");
}

const temaClaro = () => 
{
    document.querySelector("body").setAttribute("data-bs-theme", "light");

    /* Imagen de promocion por navidad */
    if (document.getElementById("imagen").classList.contains('imagenContenida2'))
    {
        document.getElementById("imagen").classList.remove('imagenContenida2');
        document.getElementById("imagen").classList.toggle('imagenContenida');
    }

    /* Logo de header */
    document.querySelector("#logoHeader").setAttribute("src", "../img/LogoCafe.svg");

     /* Header */
     if(document.getElementById("headerColor").classList.contains('bg-info'))
     {
         document.getElementById("headerColor").classList.remove('bg-info');
         document.getElementById("headerColor").classList.toggle('bg-warning');
     }

    /* Buscador */
    if(document.getElementById("buscador").classList.contains('bg-dark'))
    {
        document.getElementById("buscador").classList.remove('bg-dark');
        document.getElementById("buscador").classList.toggle('bg-white');
    }

    /* Footer */
    if(document.getElementById("footerColor").classList.contains('bg-primary'))
    {
        document.getElementById("footerColor").classList.remove('bg-primary');
        document.getElementById("footerColor").classList.toggle('bg-warning');
    }

    document.querySelector("#dl-icon").setAttribute("xlink:href", "../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#moon-stars-fill");
}

const cambiarTema = () => 
{
    document.querySelector("body").getAttribute("data-bs-theme")=== "light"?
    temaOscuro() : temaClaro();
}