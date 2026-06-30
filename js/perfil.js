'use strict';
const Space_nom = document.querySelector("#usuarioNombre");
const Space_date = document.querySelector("#usuarioFecha");
const Space_gen = document.querySelector("#usuarioGenero");
const Sesion=document.querySelector("#cerrar-ses");
const Borrar=document.querySelector("#borrar-ses");
let nom=localStorage.getItem("Nombre");
let gens=localStorage.getItem("Generos");
let gens_list="";
const Fav_Space=document.querySelector("#Fav_space");
const Later_Space=document.querySelector("#Later_Space");

Fav_Space.style.display="none";
Later_Space.style.display="none";
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
    Fav_Space.style.display="block";
    Later_Space.style.display="block";

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




if(JSON.parse(localStorage.getItem("Fav"))){
    const URL =JSON.parse(localStorage.getItem("Fav"));
    let len=Object.keys(URL).length;
    for(let i=0; i<len;i++){
        console.log(URL[i]);
        //iniciar api
        const getData = () =>
        fetch(URL[i]).then((response) =>
            response.json()
        ).catch((err) => {
            console.log("Error encontrado:", err);
        });
        const API = getData();
        API.then((res=>{
            Fav_Space.innerHTML+=`<td style=" align-items: center; "><a href="shows.html"><img class="pelicula" id="${res._links.self.href}" src="${res.image.medium}" alt="${res.name}" width="50%"></a></td>`;
            
            const Imagenes=document.querySelectorAll(".pelicula");
            Imagenes.forEach(Img=>{
                Img.addEventListener("click",()=>{
                localStorage.setItem("ID",Img.id);
                console.log(Img.id);
                });
            });
        }));
    }
    
}else{
    Fav_Space.innerHTML+=`<td style=" align-items: center; "><p>Usa el ♥ para guardar tus shows favoritos</p></td>`;
            
}

if(JSON.parse(localStorage.getItem("Later"))){
    const URL =JSON.parse(localStorage.getItem("Later"));
    let len=Object.keys(URL).length;
    for(let i=0; i<len;i++){
        console.log(URL[i]);
        //iniciar api
        const getData = () =>
        fetch(URL[i]).then((response) =>
            response.json()
        ).catch((err) => {
            console.log("Error encontrado:", err);
        });
        const API = getData();
        API.then((res=>{
            Later_Space.innerHTML+=`<td style=" align-items: center; "><a href="shows.html"><img class="pelicula" id="${res._links.self.href}" src="${res.image.medium}" alt="${res.name}" width="50%"></a></td>`;
            
            const Imagenes=document.querySelectorAll(".pelicula");
            Imagenes.forEach(Img=>{
                Img.addEventListener("click",()=>{
                localStorage.setItem("ID",Img.id);
                console.log(Img.id);
                });
            });
        }));
    }
    
}else{
    Later_Space.innerHTML+=`<td style=" align-items: center; "><p>Usa el 𖤘 para guardar tus shows favoritos</p></td>`;
            
}