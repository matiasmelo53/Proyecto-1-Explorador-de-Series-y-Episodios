'use strict';
const Space_nom = document.querySelector("#usuarioNombre");
const Space_date = document.querySelector("#usuarioFecha");
const Space_gen = document.querySelector("#usuarioGenero");
const Sesion=document.querySelector("#cerrar-ses");
const Borrar=document.querySelector("#borrar-ses");
let nom=localStorage.getItem("Nombre");
let gens=localStorage.getItem("Generos");
let gens_list="";

Sesion.style.display="none";
Borrar.style.display="none";

//console.log("data: "+nom,localStorage.getItem("Contraseña")); 

if (sessionStorage.getItem("login")=="True"){
    //Mostrar los botones escondidos, esconder los ya usados
    form_btn.forEach(e=>{
        e.style.display="none";
    });
    perfil_nav.style.display="block";
    Sesion.style.display="Block";
    Borrar.style.display="block";

    //mostrar datos recolectados.
    Space_nom.innerHTML=nom;
    gens_list=JSON.parse(gens);
    gens_list.forEach(element => {
        Space_gen.innerHTML+=element+" ";
    });
    
}
const ses_close=()=>{
    form_btn.forEach(e=>{
        e.style.display="block";
    });
    perfil_nav.style.display="none";
    sessionStorage.setItem("login","False");
}
Sesion.addEventListener("click",()=>{
    if(confirm("Su sesión se Cerrará, pero su cuenta No será eliminada. ¿desea continuar?")){
        ses_close();
        window.location.reload();
    }
});

Borrar.addEventListener("click",()=>{
    if(confirm("Su sesión sera Borrada de forma permanente. ¿desea continuar?")){
        ses_close();
        localStorage.clear();
        window.location.reload();
    }
});

