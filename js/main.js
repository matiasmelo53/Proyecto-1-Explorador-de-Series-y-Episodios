
for (let i = 1; i <= 7; i++) {
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