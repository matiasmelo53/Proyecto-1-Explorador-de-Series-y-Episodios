'use strict';
const Space_nom = document.querySelector("#usuarioNombre");
const Space_date = document.querySelector("#usuarioFecha");
const Space_gen = document.querySelector("#usuarioGenero");
const Sesion=document.querySelector("#cerrar-ses");
const Borrar=document.querySelector("#borrar-ses");
let nom=localStorage.getItem("Nombre");
let gens=localStorage.getItem("Generos");
let gens_list="";
const Fav_Space=document.querySelector("#Favoritos");
const Later_Space=document.querySelector("#Ver_Tarde");
const Stats=document.querySelector("#stats");

Fav_Space.style.display="none";
Later_Space.style.display="none";
Sesion.style.display="none";
Borrar.style.display="none";
Stats.style.display="none";

//console.log("data: "+nom,localStorage.getItem("Contraseña")); 

if (sessionStorage.getItem("login")=="True"){
    //Mostrar los botones escondidos, esconder los ya usados
    form_btn.forEach(e=>{
        e.style.display="none";
    });
    perfil_nav.style.display="block";
    Sesion.style.display="Block";
    Borrar.style.display="block";
    Fav_Space.style.display="block";
    Later_Space.style.display="block";
    Stats.style.display="block";

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


let add_slide= (slideID,indexID,pos,id)=>{
  let carrusel=document.querySelectorAll(".carousel-inner");//espacio carrusel
  let slide=document.querySelector("#"+slideID);//espacio slide
  
  let clone = slide.cloneNode(true);//copia
  clone.classList.remove('active');//cambio de clase
  clone.setAttribute("id", slideID+id);//cambio de id
  carrusel[pos].insertAdjacentElement("beforeend",clone);
  let image = document.querySelectorAll("#"+indexID+"0");
  image[1].setAttribute("id", indexID+(Math.floor(id)+1));
  image[1].innerHTML="";
}

let add_card= (e,slideID,indexID,pos,id,contador)=>{
  let image = document.getElementById(indexID+id);
  if(image){
    image.innerHTML += `
    <td style=" align-items: center; padding: 10px;"><a href="shows.html" class='link_img'><img class="pelicula" id="${e._links.self.href}" src="${e.image.medium}" alt="${e.name}"></a></td>`; 
  }
  if(contador==6){
    add_slide(slideID,indexID,pos,id);
  }
}
let id_1=0;
let contador_1=0;7
if(JSON.parse(localStorage.getItem("Fav"))){
    const URL =JSON.parse(localStorage.getItem("Fav"));
    let len=Object.keys(URL).length;
    for(let i=0; i<len;i++){
        //iniciar api
        const getData = () =>
        fetch(URL[i]).then((response) =>
            response.json()
        ).catch((err) => {
            console.log("Error encontrado:", err);
        });
        const API = getData();



        API.then((res=>{
          //e,slideID,indexID,pos,id,contador
          contador_1++;
          add_card(res,"Slide-Favoritos","index-Favoritos",0,id_1,contador_1);
          if(contador_1==6){
            contador_1=0;
            id_1++;
          }
          const Imagenes=document.querySelectorAll(".pelicula");
          Imagenes.forEach(Img=>{
              Img.addEventListener("click",()=>{
                localStorage.setItem("ID",Img.id);
              });
          });
        }));
    }
}else{
    Fav_Space.innerHTML+=`<td style=" align-items: center; "><p>Usa el ♥ para guardar tus shows favoritos</p></td>`;
            
}

let id_2=0;
let contador_2=0;7
if(JSON.parse(localStorage.getItem("Later"))){
    const URL =JSON.parse(localStorage.getItem("Later"));
    let len=Object.keys(URL).length;
    for(let i=0; i<len;i++){
        //iniciar api
        const getData = () =>
        fetch(URL[i]).then((response) =>
            response.json()
        ).catch((err) => {
            console.log("Error encontrado:", err);
        });
        const API = getData();

        API.then((res=>{
          //e,slideID,indexID,pos,id,contador
          contador_2++;
          add_card(res,"Slide-Ver_Tarde","index-Ver_Tarde",1,id_2,contador_2);
          if(contador_2==6){
            contador_2=0;
            id_2++;
          }
          const Imagenes=document.querySelectorAll(".pelicula");
          Imagenes.forEach(Img=>{
              Img.addEventListener("click",()=>{
              localStorage.setItem("ID",Img.id);
              });
          });
        }));
    }
    
}else{
    Later_Space.innerHTML+=`<td style=" align-items: center; "><p>Usa el 𖤘 para guardar tus shows favoritos</p></td>`;           
}

const lista=JSON.parse(localStorage.getItem("Visto"));
console.log("lista fav",JSON.parse(localStorage.getItem("Fav")));
const lista2=JSON.parse(localStorage.getItem("Fav"));


let sciFi=0,Horror=0, Romance=0, Comedia=0, Accion=0,Otros=0;

const yValues = [0, 0, 0, 0, 0, 0];
const valores_Fav = [0, 0, 0, 0, 0, 0];

const barColors = ["MediumSlateBlue", "blueviolet","violet","blue","Indigo","PaleTurquoise"];
const xValues = ["Ciencia Ficción", "Horror", "Romance", "Comedia", "Acción","Otros"];
const ctx = document.getElementById('Chart_Vistos');
const char2=document.querySelector("#Chart_Fav");

async function getData(url,Y){
    try{ 
        console.log("url",url);
        const res= await fetch(url);
        const esp= await res.json();
        await ASS(esp,Y);
    }catch(er){
        console.log("ERROR");
        console.error("Error: "+er);
    }
}
async function ASS(res,Y) {
    let lar = Object.keys(res.genres).length;
    if(res.genres.includes("Science-Fiction")){
        Y[0]++;
    }
     if (res.genres.includes("Horror")){
        Y[1]++;
    }
     if(res.genres.includes("Romance")){
        Y[2]++;
    }
     if(res.genres.includes("Comedy")){
        Y[3]++;
    }
     if(res.genres.includes("Action")){
        Y[4]++;
    }
    if(res.genres.includes("Action")==false && res.genres.includes("Comedy")==false && res.genres.includes("Romance")==false && res.genres.includes("Horror")==false && res.genres.includes("Science-Fiction")==false){
        Y[5]++;
    }
    //if(res.genres.includes("Action")==false && res.genres.includes("Comedy")==false && res.genres.includes("Romance")==false && res.genres.includes("Horror")==false && res.genres.includes("Science-Fiction")==false);
 
};

async function contadores(list,Y,callback){
    let len=Object.keys(list).length;
    for (let i=0;i<len;i++){
        await getData(list[i],Y);
    }
    callback();
}

contadores(lista,yValues, grafico_visto);
contadores(lista2,valores_Fav,grafico_fav);

function grafico_visto(){
    new Chart(ctx, {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
        data: yValues,
        backgroundColor: barColors
        
        }]
    },
    options: {
        plugins: {
        legend: {display: false},
        title: {
            display: true,
            text: "Los Géneros que Has Visto",
            font: {size: 20}
        }
        }
    }
    });
}

function grafico_fav(){
     new Chart(char2, {
        type: 'doughnut',
        data:{
            labels:xValues,
            datasets: [{
                data: valores_Fav,
                backgroundColor: barColors,
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: "Tus géneros favoritos",
                font: {size: 20}
            }
            }
        }
    });
}