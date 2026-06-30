for (let i = 1; i <= 25; i++) {
    fetch("https://api.tvmaze.com/shows/"+i)
        //.then(res => console.log(result))
        .then(response => response.json())
        .then(res => {

            let image = document.getElementById("indexRecomendado1");
            if (i>8){
                image = document.getElementById("indexRecomendado2");
            } 
            if (i>16){
                image = document.getElementById("indexRecomendado3");
            }

            if(i!=17){
              image.innerHTML += `<a href="shows.html"><img style="margin:5px;" class="pelicula" data-id="${res.id}" src="${res.image.medium}" alt="${res.name}"></a>`;
            }else{
                ;
            }
          })
        .catch(error => {
            console.log(error);
            let image = document.getElementById("indexRecomendado1");
            if (i>8){
                image = document.getElementById("indexRecomendado2");
            } 
            if (i>16){
                image = document.getElementById("indexRecomendado3");
            }
            image.innerHTML += `<div style="width:210px; height:295px;">Hubo un problema al cargar la serie.   Index=${i}. Error: ${error}</div>`;
        });
}

fetch("https://api.tvmaze.com/shows")
        .then(response => response.json())
        .then(res => {
            let currentSlide = "";
            let counterAccion = 0;
            let counterDrama = 0;
            let counterAventura = 0;
            
            res.forEach(show => {
                
                let displayed = false;

                if (show.genres.includes("Action") && counterAccion<24){
                    counterAccion++;
                    displayed = true;
                    currentSlide = "accion";
                    let indexAccion = document.getElementById("indexAccion1");
                    if (counterAccion>8){
                        indexAccion = document.getElementById("indexAccion2");
                    }
                    if (counterAccion>16){
                        indexAccion = document.getElementById("indexAccion3");
                    }
                    indexAccion.innerHTML += `<a href="shows.html"><img style="margin:5px;" class="pelicula" data-id="${show.id}" src="${show.image.medium}" alt="${show.name}"></a>`;
                }

                if (show.genres.includes("Drama") && counterDrama<24 && displayed == false){
                    counterDrama++;
                    displayed = true;
                    currentSlide = "drama";
                    let indexDrama = document.getElementById("indexDrama1");
                    if (counterDrama>8){
                        indexDrama = document.getElementById("indexDrama2");
                    }
                    if (counterDrama>16){
                        indexDrama = document.getElementById("indexDrama3");
                    }
                    indexDrama.innerHTML += `<a href="shows.html"><img style="margin:5px;" class="pelicula" data-id="${show.id}" src="${show.image.medium}" alt="${show.name}"></a>`;
                }

                if (show.genres.includes("Adventure") && counterAventura<24 && displayed == false){
                    counterAventura++;
                    displayed = true;
                    currentSlide = "Aventura";
                    let indexAventura = document.getElementById("indexAventura1");
                    if (counterAventura>8){
                        indexAventura = document.getElementById("indexAventura2");
                    }
                    if (counterAventura>16){
                        indexAventura = document.getElementById("indexAventura3");
                    }
                    indexAventura.innerHTML += `<a href="shows.html"><img style="margin:5px;" class="pelicula" data-id="${show.id}" src="${show.image.medium}" alt="${show.name}"></a>`;
                }
                
            });
          })
        .catch(error => {
            console.log(error);
            if (currentSlide == "accion"){
                let index = document.getElementById("indexAccion1");
                if (counterAccion>8){
                    index = document.getElementById("indexAccion2");
                }
                if (counterAccion>16){
                    index = document.getElementById("indexAccion3");
                }
            }
            
            if (currentSlide == "drama"){
                let index = document.getElementById("indexDrama1");
                if (counterDrama>8){
                    index = document.getElementById("indexDrama2");
                }
                if (counterDrama>16){
                    index = document.getElementById("indexDrama3");
                }
            }

            if (currentSlide == "aventura"){
                let index = document.getElementById("indexAventura1");
                if (counterAventura>8){
                    index = document.getElementById("indexAventura2");
                }
                if (counterAventura>16){
                    index = document.getElementById("indexAventura3");
                }
            }
            
            index.innerHTML += `<div style="width:210px; height:295px;">Hubo un problema al cargar la serie. Error: ${error}</div>`;
        });

