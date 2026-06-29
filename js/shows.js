'use strict';
const URL =localStorage.getItem("ID");
console.log(URL);
const getData = () =>
  fetch(URL).then((response) =>
    response.json()
  ).catch((err) => {
    console.log("Error encontrado:", err);
  });

const Caratula=document.querySelector(".img");
const Titulo=document.querySelector(".showTitulo");
const Status=document.querySelector("#showStatus");
const Estreno=document.querySelector("#showEstreno");
const Fin=document.querySelector("#showFin");
const Lenguaje=document.querySelector("#showLenguaje");
const Genero=document.querySelector("#showGenero");
const Link=document.querySelector("#showSitio");
const Descripcion=document.querySelector("#showDesc");


const API = getData();
API.then((result) =>{
    Caratula.innerHTML = `<img src="${result.image.original}" class="caratula" alt="${result.name}"  width="250px;">`; 
    Titulo.innerHTML=`<h1>${result.name}</h1>`;
    Status.innerHTML=`Status: ${result.status}`;
    Estreno.innerHTML=`Se estrenó el ${result.premiered}`;
    Fin.innerHTML=`Se terminó el ${result.ended}`;
    Lenguaje.innerHTML=`Lenguaje: ${result.language}`;
    let len = Object.keys(result.genres).length;
    console.log(Genero);
    for(let i=0; i<len;i++){
        Genero.innerHTML+=result.genres[i]+" ";
    }
    Link.innerHTML=`<b>Disponible en:</b> <a style="color: black;" href="${result.network.officialSite}">${result.network.name}</a>`;
    Descripcion.innerHTML=`<b>Sinopsis:</b> <p><b>${result.name}</b>${result.summary}</p>`;

});