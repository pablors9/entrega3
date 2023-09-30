const apiConsulta = document.getElementById("atrapalos");
const ingNombre = document.getElementById("nombre");

///objetoLiteral para el entrenadorPokemon
let trainer1 = {
  name: "",
  experience: 0,
  pokemons: [],
};

///Variables para el pokemon aleatorio
let nombre,
  exp = 0,
  imagen,
  experiencia = 0,
  llamadas = 0;

///Función que SUMA 1 cada click y GENERA un num aleatorio para la API
const pokeRandom = () => {
  
  if (llamadas===4){
    document.getElementById(
      "atrapalos"
    ).innerText="Ganar Exp!"
    document.getElementById(
      "atrapalos"
    ).style.background="black"
    document.getElementById(
      "atrapalos"
    ).style.color="aliceblue"
   
    let poketemporal = Math.floor(Math.random() * (151 - 1 + 1) + 1)
    añadeColeccion(poketemporal)
    pokedex(poketemporal)
  }
  else if (llamadas===5) {
    document.getElementById(
      "atrapalos"
    ).style.display="none"
    sumaExp()
    localStorageGuardar()
    borrarPrincipal()
    llamadas += 1;
  }
  else if (llamadas > 5) 
  return

  else{
  let poketemporal = Math.floor(Math.random() * (151 - 1 + 1) + 1)
  añadeColeccion(poketemporal)
  pokedex(poketemporal)
  document.getElementById(
    "imgButton"
  ).src = `https://st2.depositphotos.com/4201469/11665/v/950/depositphotos_116653256-stock-illustration-vector-color-pokeball-objects-for.jpg`;

}
  llamadas += 1
};

///Función que AÑADE la imagen al HTML usando querySelector
function añadeColeccion(poketemporal) {
  document.getElementById("callToAction").style.display="none"
  document.getElementById("foto").style.display="block"
 
  let p = 0;
  let tiempo1 = setInterval(() => {
    p += 1;
    document.getElementById(
      "foto"
    ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p}.png`;
    if (p === poketemporal) {
      clearInterval(tiempo1);
      dibujarCard(llamadas, poketemporal);
      datosTarjeta();
    }
  }, 5);
 
 
}

//Función que suma experiencia usando un ciclo

function sumaExp() {
  for (let i = 0; i < trainer1.pokemons.length; i += 1) {
    console.log(trainer1.pokemons[i].experience);
    trainer1.experience += trainer1.pokemons[i].experience;
  }
  console.log(trainer1.experience);

  /////Función para desplegar experiencia con animación
  const numero = document.getElementById("puntos");

  let cantidad = 0;
  let tiempo = setInterval(() => {
    cantidad += 1;
    numero.textContent = "Experiencia inicial : " + cantidad;
    if (cantidad === trainer1.experience) {
      clearInterval(tiempo);
    }
  }, 3);
}

///Función que OBTIENE datos del pokemon atrapado
function pokedex(poketemporal) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${poketemporal}`)
    .then((response) => response.json())
    .then((data) => {
      let Pokemon = {
        name: "",
        experience: 0,
        type: "",
        hP: 0,
        attack: 0,
        defense: 0,
      };
      Pokemon.name = data.name;
      Pokemon.experience = data.base_experience;
      Pokemon.type = data.types[0].type.name;
      trainer1.pokemons.push(Pokemon);
    })
    
}

///Función que hace visibles las cartas y coloca las imágenes
function dibujarCard(llamadas, poketemporal) {
  const card1 = document.getElementById("card1");
  const card2 = document.getElementById("card2");
  const card3 = document.getElementById("card3");
  const card4 = document.getElementById("card4");
  const card5 = document.getElementById("card5");
  switch (llamadas) {
    case 1:
      card1.style.display = "flex";
      document.getElementById(
        "img1"
      ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poketemporal}.png`;
      break;
    case 2:
      card2.style.display = "flex";
      document.getElementById(
        "img2"
      ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poketemporal}.png`;
      break;
    case 3:
      card3.style.display = "flex";
      document.getElementById(
        "img3"
      ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poketemporal}.png`;
      break;
    case 4:
      card4.style.display = "flex";
      document.getElementById(
        "img4"
      ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poketemporal}.png`;
      break;
    case 5:
      card5.style.display = "flex";
      document.getElementById(
        "img5"
      ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poketemporal}.png`;
      break;
  }
  if (llamadas<=4){
  document.getElementById(
    "imgButton"
  ).src = `https://elspotsm.com/wp-content/uploads/2020/12/Pokebola-pokeball.jpg`;
  }
}

////Función que coloca los datos de cada pokemon en las tarjetas usando arrays y métodos de arrays
function datosTarjeta(){
  let i=1;
trainer1.pokemons.forEach(element => {
 
  switch (i) {
    case 1:
      
      document.getElementById(
        "nombre1"
      ).innerHTML = element.name;
      break;
    case 2:
      
      document.getElementById(
        "nombre2"
      ).innerHTML = element.name;
      break;
    case 3:
     
      document.getElementById(
        "nombre3"
      ).innerHTML = element.name;
      break;
    case 4:
     
      document.getElementById(
        "nombre4"
      ).innerHTML = element.name;
      break;
    case 5:
     
      document.getElementById(
        "nombre5"
      ).innerHTML = element.name;
      break;
  }
  i+=1;
});

}
///Función para borrar el pokemon grande y liberar espacio en pantalla
function borrarPrincipal(){
document.getElementById("foto").style.display="none"
let y= document.getElementsByClassName("container")
let j;
for (j = 0; j < y.length; j++) {
    y[j].style.top= "20%";
}
document.getElementById("nombre").style.display="inline"
}
///Función para guardar en Local Storage los datos del jugador
function localStorageGuardar(nombre){
  trainer1.name=nombre
  let entrenador=trainer1;
  localStorage.setItem("entrenador",JSON.stringify(entrenador))
}

///Función para ingresar el nombre del jugador se pasa al localstorage al presionar Enter
function valorNombre(event){
  if (event.key === "Enter") {
    localStorageGuardar(document.getElementById("nombre").value)
    premio()
  }
}

////Función que obtiene del Local Storage datos para felicitar al jugador
function premio(){
  document.getElementById("nombre").style.display="none"
  document.getElementById("congrats").style.display="flex"
  let trainer1temp=JSON.parse(localStorage.getItem("entrenador"))
  document.getElementById("congrats").textContent="Felicidades, " + trainer1temp.name
}
///Sección de EVENTOS
apiConsulta.addEventListener("click", pokeRandom);
ingNombre.addEventListener("keydown",valorNombre);