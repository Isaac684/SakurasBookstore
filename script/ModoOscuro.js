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
        document.getElementById("headerColor").classList.toggle('bg-primary');
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
     if(document.getElementById("headerColor").classList.contains('bg-dark'))
     {
         document.getElementById("headerColor").classList.remove('bg-dark');
         document.getElementById("headerColor").classList.toggle('bg-primary');
     }

    /* Footer */
    if(document.getElementById("footerColor").classList.contains('bg-dark'))
    {
        document.getElementById("footerColor").classList.remove('bg-dark');
        document.getElementById("footerColor").classList.toggle('bg-primary');
    }

    document.querySelector("#dl-icon").setAttribute("xlink:href", "../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#moon-stars-fill");
}

const cambiarTema = () => 
{
    document.querySelector("body").getAttribute("data-bs-theme")=== "light"?
    temaOscuro() : temaClaro();
}