'use strict';
const Seccion_ver=document.querySelector("#Ver_Tarde");//sección de ver más tarde
Seccion_ver.style.display="none";
if (sessionStorage.getItem("login")=="True"){
  Seccion_ver.style.display="block";
}

//genarización de datos de la api
const getData = () =>
  fetch("https://api.tvmaze.com/shows").then((response) =>
    response.json()
  ).catch((err) => {
    console.log("Error encontrado:", err);
  });

const API = getData();

sessionStorage.setItem("contador_1",0);sessionStorage.setItem("contador_2",0);
sessionStorage.setItem("contador_3",0);sessionStorage.setItem("contador_4",0);
sessionStorage.setItem("contador_5",0);sessionStorage.setItem("contador_6",0);sessionStorage.setItem("contador_8",0);
//contador que define la cantidad de cartas en el slide

sessionStorage.setItem("id_1",0);sessionStorage.setItem("id_2",0);
sessionStorage.setItem("id_3",0);sessionStorage.setItem("id_4",0);
sessionStorage.setItem("id_5",0);sessionStorage.setItem("id_6",0);sessionStorage.setItem("id_8",0);
//cambia la seleccion de slide 


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
    <td style=" align-items: center; padding: 10px;"><a href="shows.html" class='link_img' id="${e._links.self.href}" ><img  class="pelicula" src="${e.image.medium}" alt="${e.name}"></a></td>`; 
  }
  if(contador==6){
    add_slide(slideID,indexID,pos,id);
  }
}

API.then((result) => {//Uso de la api
  if(result){
      result.forEach(element => {//recorre toda la api
        //Aplicar api en el index
          let len = Object.keys(element.genres).length;
          
          for (let i=0; i<len;i++ ){//recorre array genero
            if(element.genres[i]=="Science-Fiction"){
              sessionStorage.setItem("contador_1",Math.floor(sessionStorage.getItem("contador_1"))+1);
              add_card(element,"Slide-CienciaFiccion","index-CienciaFiccion",2,sessionStorage.getItem("id_1"),sessionStorage.getItem("contador_1"));
              //añade elemento al display
              if(sessionStorage.getItem("contador_1")=="6"){
                sessionStorage.setItem("contador_1",0);
                sessionStorage.setItem("id_1",Math.floor(sessionStorage.getItem("id_1"))+1);
                //la cantidad de cartas mostradas
              }
            }
            if(element.genres[i]=="Horror"){
              sessionStorage.setItem("contador_2",Math.floor(sessionStorage.getItem("contador_2"))+1);
              add_card(element,"Slide-Horror","index-Horror",3,sessionStorage.getItem("id_2"),sessionStorage.getItem("contador_2"));
              if(sessionStorage.getItem("contador_2")=="6"){
                sessionStorage.setItem("contador_2",0);
                sessionStorage.setItem("id_2",Math.floor(sessionStorage.getItem("id_2"))+1);
              }
              
            }
            if(element.genres[i]=="Romance"){
              sessionStorage.setItem("contador_3",Math.floor(sessionStorage.getItem("contador_3"))+1);
              add_card(element,"Slide-Romance","index-Romance",4,sessionStorage.getItem("id_3"),sessionStorage.getItem("contador_3"));
              if(sessionStorage.getItem("contador_3")=="6"){
                sessionStorage.setItem("contador_3",0);
                sessionStorage.setItem("id_3",Math.floor(sessionStorage.getItem("id_3"))+1);
              }
            }
            if(element.genres[i]=="Comedy"){
              sessionStorage.setItem("contador_4",Math.floor(sessionStorage.getItem("contador_4"))+1);
              add_card(element,"Slide-Comedy","index-Comedy",5,sessionStorage.getItem("id_4"),sessionStorage.getItem("contador_4"));
              if(sessionStorage.getItem("contador_4")=="6"){
                sessionStorage.setItem("contador_4",0);
                sessionStorage.setItem("id_4",Math.floor(sessionStorage.getItem("id_4"))+1);
              }
            }
            if(element.genres[i]=="Action"){
              sessionStorage.setItem("contador_5",Math.floor(sessionStorage.getItem("contador_5"))+1);
              add_card(element,"Slide-Action","index-Action",6,sessionStorage.getItem("id_5"),sessionStorage.getItem("contador_5"));
              if(sessionStorage.getItem("contador_5")=="6"){
                sessionStorage.setItem("contador_5",0);
                sessionStorage.setItem("id_5",Math.floor(sessionStorage.getItem("id_5"))+1);
              }
            }
          }
        if(element.rating.average>="8.5"){
          sessionStorage.setItem("contador_6",Math.floor(sessionStorage.getItem("contador_6"))+1);
          add_card(element,"Slide-Recomendado","index-Recomendado",0,sessionStorage.getItem("id_6"),sessionStorage.getItem("contador_6"));
          if(sessionStorage.getItem("contador_6")=="6"){
            sessionStorage.setItem("contador_6",0);
            sessionStorage.setItem("id_6",Math.floor(sessionStorage.getItem("id_6"))+1);
          }
        }
        if(element.genres.includes("Action")==false && element.genres.includes("Comedy")==false && element.genres.includes("Romance")==false && element.genres.includes("Horror")==false && element.genres.includes("Science-Fiction")==false){
          sessionStorage.setItem("contador_8",Math.floor(sessionStorage.getItem("contador_8"))+1);
          add_card(element,"Slide-Otro","index-Otro",7,sessionStorage.getItem("id_8"),sessionStorage.getItem("contador_8"));
          if(sessionStorage.getItem("contador_8")=="6"){
            sessionStorage.setItem("contador_8",0);
            sessionStorage.setItem("id_8",Math.floor(sessionStorage.getItem("id_8"))+1);
          }
        }
      });
  }
  //aplicar interacción a las imagenes
  const Imagenes=document.querySelectorAll(".link_img");
  Imagenes.forEach(Img=>{
    Img.addEventListener("click",()=>{
      localStorage.setItem("ID",Img.id);
    });
  });
});

let id_7=0;
let contador_7=0;
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
          contador_7++;
          add_card(res,"Slide-Ver_Tarde","index-Ver_Tarde",1,id_7,contador_7);
          if(contador_7==6){
            contador_7=0;
            id_7++;
          }
          const Imagenes=document.querySelectorAll(".link_img");
          Imagenes.forEach(Img=>{
              Img.addEventListener("click",()=>{
              localStorage.setItem("ID",Img.id);
              });
          });
        }));
    }
    
}


