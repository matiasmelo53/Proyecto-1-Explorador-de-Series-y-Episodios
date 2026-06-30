
console.log();

fetch("https://api.tvmaze.com/shows/"+localStorage.getItem("currentShow"))
        //.then(res => console.log(result))
        .then(response => response.json())
        .then(res => {
            let imagen = document.getElementById("showImagen");
            let titulo = document.getElementById("showTitulo");
            let status = document.getElementById("showStatus");
            let estreno = document.getElementById("showEstreno");
            let fin = document.getElementById("showFin");
            let lenguaje = document.getElementById("showLenguaje");
            let generos = document.getElementById("showGenero");
            let sitio = document.getElementById("showSitio");
            let descripcion = document.getElementById("showDesc");

            imagen.innerHTML = `<img src="${res.image.medium}" class="caratula" alt="${res.name}" width="250px;">`;
            titulo.innerHTML = `<h1>${res.name}</h1>`;
            status.innerHTML = `Status: ${res.status}`;

            estreno.innerHTML = `Se estrenó el ${res.premiered}`;
            if (res.ended){
                fin.innerHTML = `Se terminó el ${res.ended}`;
            } else{
                fin.innerHTML = ``;
            }
            
            lenguaje.innerHTML = `Lenguajes disponibles: ${res.language}`;
            generos.innerHTML = `<b>Generos:</b> ${res.genres}`;
            sitio.innerHTML = `<b>Disponible en:</b> <a style="color: blue" href="${res.network.officialSite}">${res.network.name}</a>`;
            descripcion.innerHTML = `<b>Sinopsis:</b> ${res.summary}`;
            
          })
        .catch(error => {
            console.log(error);
            let descripcion = document.getElementById("showDesc");
            descripcion.innerHTML = `Hubo un problema al cargar los datos de la serie. Error: ${error}`;
        });

fetch("https://api.tvmaze.com/shows/"+localStorage.getItem("currentShow")+"/episodes")
    .then(response => response.json())
    .then(res => {
        let episodios = document.getElementById("showEpisodios")
        res.forEach(episode => {

            episodios.innerHTML += 
            `<div class="col">
                <div class="card" style="width: 18rem; height:13rem;">
                    <img class="card-img-top" src="${episode.image.medium}">
                    <div class="card-body">
                        <p style="font-size: 0.9rem;" class="card-title">${episode.name}</p>
                    </div>
                </div>
            </div>`; 
        });
        })

    .catch(error =>{
        console.log(error);
        let episodios = document.getElementById("showEpisodios")
        episodios.innerHTML = 
        `<div class="col">
            Hubo un problema al cargar los episodios de la serie. Error: ${error}
        </div>`;
    })