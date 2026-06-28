'use strict';
const Space_nom = document.querySelector("#usuarioNombre");
const Space_date = document.querySelector("#usuarioFecha");
const Space_gen = document.querySelector("#usuarioGenero");
let nom=localStorage.getItem("Nombre");
let pass=localStorage.getItem("Contraseña");
console.log("login: "+sessionStorage.getItem("login"));
console.log("data: "+nom,pass);

if (sessionStorage.getItem("login")=="True"){
    console.log("IT worked");
}
    

