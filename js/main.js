
for (let i = 1; i <= 6; i++) {
    fetch("https://api.tvmaze.com/shows/"+i)
        //.then(res => console.log(result))
        .then(response => response.json())
        .then(res => {
            let image = document.getElementById("indexRecomendado");
            if(image){
              image.innerHTML += `
              <td style=" align-items: center; padding: 10px;"><a href="shows.html"><img class="pelicula" src="${res.image.medium}" alt="${res.name}"></a></td>`;
        
            }
          })
        .catch(error => {
            console.log(error);
            let recomendado = document.getElementById("indexRecomendado");
            recomendado.innerHTML += `<td style=" align-items: center; padding: 10px;" ><a href="shows.html">Hubo un problema al cargar la serie.   Index=${i}. Error: ${error}</td>`;
        });
}

const enviar= document.querySelector("#enviar-sign");
const log= document.querySelector("#btn_log");
const perfil_nav= document.querySelector(".profile");
const form_btn= document.querySelectorAll(".form-btn");
console.log(form_btn[1]);
perfil_nav.style.display="none";

enviar.addEventListener("click",()=>{
  sessionStorage.setItem("login","False");
  let validform =document.getElementById('Form').checkValidity();
  if(!validform){
    document.getElementById('Form').reportValidity();
  }else{
    event.preventDefault();
    const nom=document.querySelector("#nombre");
    const email=document.querySelector("#email");
    const passw=document.querySelector("#password");
    const sex_list=document.querySelectorAll("input[name='sex']");
    let sex="";
    let genero=[];
    sex_list.forEach(e=>{
      if(e.checked==true){
        sex=e.value;
      }
    });
    const gens_list=document.querySelectorAll(".genero");
    gens_list.forEach(element => {
      if(element.checked==true){
        genero.push(element.value);
      }
    });
    if(genero.length==0){
      genero.push("Ninguno");
    }
    
    localStorage.setItem("Nombre",nom.value);
    localStorage.setItem("Email",email.value);
    localStorage.setItem("Contraseña",passw.value);
    localStorage.setItem("Sexo",sex);
    localStorage.setItem("Generos",JSON.stringify(genero));
    
    document.getElementById('Form').style.display="none";
    document.querySelector(".sign-in").innerHTML="<h3 class='sliderTitulo' style='color: black;'>Gracias por inscribirte!</h3>";
  }

});

log.addEventListener("click",()=>{
  let validform =document.querySelector('.login-form').checkValidity();
  if(!validform){
    document.querySelector('.login-form').reportValidity();
  }else{
    let nam_log = document.querySelector("#username");
    let pass_log= document.querySelector("#password_log");
    if(nam_log.value==localStorage.getItem("Nombre") && pass_log.value==localStorage.getItem("Contraseña")){
      sessionStorage.setItem("login","True");
    }else{
      sessionStorage.setItem("login","False");
    }
    if(sessionStorage.getItem("login")=="True"){
      document.querySelector('.login-form').style.display="none";
      document.querySelector(".login_space").innerHTML="<h1 style='font-size: 50px; color: #FCFAEE; text-shadow: 2px 2px black; background-color: #00b0d4;'>Sesion Iniciada</h1>";
      perfil_nav.style.display="block";
      document.querySelectorAll(".btn-close")[1].addEventListener("click",()=>{
        form_btn.forEach(e=>{
          e.style.display="none";
        });
        window.location.reload();
      });
    }else{
      let alerta= document.createElement('p');
      let text= document.createTextNode("Algo salió mal, contraseña o usuario erroneo.");
      alerta.appendChild(text);
      alerta.style.cssText = 'color: black; text-shadow: 1px 1px #00B0D4;';
      document.querySelector('#Space_alert').appendChild(alerta);
      document.querySelector('.login-form').reset();
    }
    event.preventDefault();
  }
});

