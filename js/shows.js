'use strict';
const URL =localStorage.getItem("ID");
const getData = (URL) =>
  fetch(URL).then((response) =>
    response.json()
  ).catch((err) => {
    console.log("Error encontrado:", err);
    window.close;
  });

const list=[];
if(!localStorage.getItem("Fav")){
  localStorage.setItem("Fav",JSON.stringify(list));
}
if(!localStorage.getItem("Later")){
  localStorage.setItem("Later",JSON.stringify(list));
}
if(!localStorage.getItem("Visto")){
  localStorage.setItem("Visto",JSON.stringify(list));
}

const Caratula=document.querySelector(".img");
const Titulo=document.querySelector(".showTitulo");
const Status=document.querySelector("#showStatus");
const Estreno=document.querySelector("#showEstreno");
const Fin=document.querySelector("#showFin");
const Lenguaje=document.querySelector("#showLenguaje");
const Genero=document.querySelector("#showGenero");
const Link=document.querySelector("#showSitio");
const Descripcion=document.querySelector("#showDesc");

const icon = document.querySelectorAll(".deactivated");
const icon2 = document.querySelectorAll(".activated");

icon2.forEach(a=>{
  a.style.display="none";
});

const btn_Fav=document.querySelector(".favorito");
const btn_Late=document.querySelector(".mas_tarde");
const btn_visto=document.querySelector(".visto");

btn_Fav.style.display="none";
btn_Late.style.display="none";

const API = getData(URL);
API.then((result) =>{
    Caratula.innerHTML = `<img src="${result.image.original}" class="caratula" alt="${result.name}"  width="250px;">`; 
    Titulo.innerHTML=`<h1>${result.name}</h1>`;
    Status.innerHTML=`Status: ${result.status}`;
    Estreno.innerHTML=`Se estrenó el ${result.premiered}`;
    if(result.status=="Ended"){Fin.innerHTML=`Se terminó el ${result.ended}`;}
    Lenguaje.innerHTML=`Lenguaje: ${result.language}`;
    let len = Object.keys(result.genres).length;
    for(let i=0; i<len;i++){
        Genero.innerHTML+=result.genres[i]+" ";
    }
    Link.innerHTML=`<b>Disponible en:</b> <a style="color: black;" href="${result.officialSite}">${result.network.name}</a>`;
    Descripcion.innerHTML=`<b>Sinopsis:</b> <p><b>${result.name}</b>${result.summary}</p>`;
    let id_show=result.id;
    fetch("https://api.tvmaze.com/shows/"+id_show+"/episodes")
      .then(response => response.json())
      .then(res => {
          let episodios = document.getElementById("showEpisodios");
          res.forEach(episode => {
            if(episode.image){
              episodios.innerHTML += 
              `<div class="col">
                  <div class="card" style="width: 18rem; height:13rem;">
                      <img class="card-img-top" src="${episode.image.original}" width="250px" height="150px">
                      <div class="card-body">
                          <p style="font-size: 0.9rem;" class="card-title">${episode.name}</p>
                      </div>
                  </div>
              </div>`;
            }else{
              episodios.innerHTML += 
              `<div class="col">
                  <div class="card" style="width: 18rem; height:13rem;">
                      <h3>Imagen no disponible<h3>
                      <div class="card-body">
                          <p style="font-size: 0.9rem;" class="card-title">${episode.name}</p>
                      </div>
                  </div>
              </div>`;

            }
          });
          })

      .catch(error =>{
          console.log(error);
          let episodios = document.getElementById("showEpisodios")
          episodios.innerHTML = `Hubo un problema al cargar los episodios de la serie. Error: ${error}`;
      })
});




if(sessionStorage.getItem("login")=="True"){
  
  btn_Late.style.display="inline";
  btn_Fav.style.display="inline";
  
}

btn_Fav.addEventListener("click",()=>{
  if(btn_Fav.checked==true ){
    icon2[0].style.display="inline";
    icon[0].style.display="none";
    let fav_list=JSON.parse(localStorage.getItem("Fav"));
    if(!fav_list.includes(URL)){
      fav_list.push(URL);
    }
    localStorage.setItem("Fav",JSON.stringify(fav_list));
  }else{
    icon2[0].style.display="none";
    icon[0].style.display="inline";
    let fav_list=JSON.parse(localStorage.getItem("Fav"));
    if(fav_list.includes(URL)){
      let index=fav_list.indexOf(URL);
      fav_list.splice(index,1);
    }
    localStorage.setItem("Fav",JSON.stringify(fav_list));
  }
});

btn_Late.addEventListener("click",()=>{
  if(btn_Late.checked==true){
    icon2[1].style.display="inline";
    icon[1].style.display="none";
    let fav_lat=JSON.parse(localStorage.getItem("Later"));
    if(!fav_lat.includes(URL)){
      fav_lat.push(URL);
    }
    localStorage.setItem("Later",JSON.stringify(fav_lat));
  }else{
    icon2[1].style.display="none";
    icon[1].style.display="inline";
    let fav_lat=JSON.parse(localStorage.getItem("Later"));
    if(fav_lat.includes(URL)){
      let index=fav_lat.indexOf(URL);
      fav_lat.splice(index,1);
    }
    
    localStorage.setItem("Later",JSON.stringify(fav_lat));
  }
});

btn_visto.addEventListener("click",()=>{
  if(btn_visto.checked==true){
    icon2[2].style.display="inline";
    icon[2].style.display="none";
    let visto_list=JSON.parse(localStorage.getItem("Visto"));
    if(!visto_list.includes(URL)){
      visto_list.push(URL);
    }
    localStorage.setItem("Visto",JSON.stringify(visto_list));
  }else{
    icon2[2].style.display="none";
    icon[2].style.display="inline";
    let visto_list=JSON.parse(localStorage.getItem("Visto"));
    if(visto_list.includes(URL)){
      let index=visto_list.indexOf(URL);
      visto_list.splice(index,1);
    }
    
    localStorage.setItem("Visto",JSON.stringify(visto_list));
  }
  console.log(localStorage.getItem("Visto"));
});


