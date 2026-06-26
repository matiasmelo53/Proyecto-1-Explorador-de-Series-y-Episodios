
for (let i = 1; i <= 6; i++) {
    fetch("https://api.tvmaze.com/shows/"+i)
        //.then(res => console.log(result))
        .then(response => response.json())
        .then(res => {
            let image = document.getElementById("indexRecomendado");

            image.innerHTML += `
            <td style=" align-items: center; padding: 10px;"><a href="shows.html"><img class="pelicula" src="${res.image.medium}" alt="${res.name}"></a></td>`;
        })
        .catch(error => {
            console.log(error);
            let recomendado = document.getElementById("indexRecomendado");
            recomendado.innerHTML += `<td style=" align-items: center; padding: 10px;" ><a href="shows.html">Hubo un problema al cargar la serie.   Index=${i}. Error: ${error}</td>`;
        });
}

const enviar= document.querySelector("#enviar-sign");
 
enviar.addEventListener("click",()=>{
  const nom=document.querySelector("#nombre");
  const email=document.querySelector("#email");
  const passw=document.querySelector("#password");
  const sex_list=document.querySelectorAll("input[name='sex']");
  let sex="";
  let genero="";
  sex_list.forEach(e=>{
    if(e.checked==true){
      sex=e.value;
    }
  });
  const gens_list=document.querySelectorAll(".genero");
  gens_list.forEach(element => {
    if(element.checked==true){
      genero+=","+element.value;
    }
  });
  
  console.log("Nom: "+nom.value+" Email: "+email.value+" contra: "+passw.value+" SX: "+sex+" Generos: "+genero);

  event.preventDefault();
});