
//Public key
//e49596fff6af7d3b08ef0dcfd8133490

//private key
//1a13b777b21a3139ae7eacbb215fe8290bc671e1ee49596fff6af7d3b08ef0dcfd8133490

const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

let id;

window.addEventListener('DOMContentLoaded', () =>{
    formulario.addEventListener('submit', buscarPersonaje);
    

});

function buscarPersonaje(e){
    e.preventDefault();

    
    //validar form
    const nombrePersonaje = document.querySelector('#nombre').value;

    if(nombrePersonaje === ''){
        mostrarAlerta('Hubo un Error')

        return;
    };

    consultarApi(nombrePersonaje);

};

function mostrarComics(e){
    e.preventDefault();

    const nombrePersonaje = document.querySelector('#nombre').value;

    if(nombrePersonaje === ''){
        mostrarAlerta('Hubo un Error')

        return;
    };

    consultarApicomic();
}


function consultarApi(nombrePersonaje){

    const url = `https://gateway.marvel.com:443/v1/public/characters?name=${nombrePersonaje}&ts=1&apikey=e49596fff6af7d3b08ef0dcfd8133490&hash=813fbbf799e666baebffeaa21be96b19`
    spinner();
    setTimeout(() => {
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML();
            if(datos.data.total === 0){
                mostrarAlerta('no se encontro nada');
                return;
            };
            mostrarDatos(datos)
           
            id = datos.data.results[0].id;
        });
    }, 2000);
};

function consultarApicomic(){
    const urlComic = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?format=comic&ts=1&apikey=e49596fff6af7d3b08ef0dcfd8133490&hash=813fbbf799e666baebffeaa21be96b19`;
    spinner();
    setTimeout(() => {
        fetch(urlComic)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML();
            if(datos.data.total === 0){
                mostrarAlerta('no se encontro nada');

                return;
            };
            mostrarDatosComics(datos)
        });
    }, 2000);
   
};

function mostrarDatosComics(datos){
 
   for(comics of datos.data.results){
    const cardComic = document.createElement('div');
    cardComic.classList.add('w-1/2', 'md:w-1/3', 'lg:w-1/4', 'mb-4' ,'p-3');

    const nombreComic = document.createElement('p');
    nombreComic.innerHTML = `${comics.title}`
    nombreComic.classList.add('font-bold', 'bg-red-700', 'mx-auto', 'text-center');

    const comicImg = document.createElement('img');
    comicImg.src = `${comics.thumbnail.path}.jpg`;
    comicImg.classList.add('img');

    cardComic.appendChild(nombreComic);
    cardComic.appendChild(comicImg);

    resultado.appendChild(cardComic);

   };

};


function mostrarDatos(datos){

    for(personajes of datos.data.results){

    const card = document.createElement('div');
    card.classList.add('w-1/2', 'md:w-1/3', 'lg:w-1/4', 'mb-4' ,'p-3', 'card');

    const nombrePersonaje = document.createElement('p');
    nombrePersonaje.innerHTML = `${personajes.name}`
    nombrePersonaje.classList.add('font-bold', 'bg-white', 'mx-auto', 'text-center');

    const personajeImg = document.createElement('img');
    personajeImg.src = `${personajes.thumbnail.path}.jpg`
    personajeImg.classList.add('img')

    const btnMostrarComics = document.createElement('button');
    btnMostrarComics.textContent = "Mostrar Comics"
    btnMostrarComics.classList.add('w-full', 'bg-yellow-500', 'p-3', 'uppercase', 'font-bold', 'cursor-pointer', 'rounded', 'hover:bg-yellow-700', 'text-center');
    btnMostrarComics.onclick = function(){
        consultarApicomic();
    };
    

    card.appendChild(nombrePersonaje);
    card.appendChild(personajeImg);
    card.appendChild(btnMostrarComics);


    resultado.appendChild(card)

    formReset();
    };
    
};

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    };
};

function mostrarAlerta(mensaje){
    
    const alerta = document.querySelector('.bg-red-100')
    if(!alerta){
    const alerta = document.createElement('div');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'py-10', 'rounded',
    'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    alerta.innerHTML = `
    <strong class = "font-bold">Error!</strong>
    <span class = "block">${mensaje}</span>
    `;

    container.appendChild(alerta)

        setTimeout(() => {
            alerta.remove();
        }, 2000);
    };

};

function spinner(){
    limpiarHTML();
    const divSpiner = document.createElement('div');
    divSpiner.classList.add("sk-cube-grid");

    divSpiner.innerHTML = `
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>
    `;

    resultado.appendChild(divSpiner);
};

function formReset(){
    formulario.reset();
}