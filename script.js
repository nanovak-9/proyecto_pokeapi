"use strict";



const url = "https://pokeapi.co/api/v2/pokemon?limit=15";

// Crear tarjeta de información //
function printData(poke_info) {
    console.log(poke_info);

    let container = document.getElementById("pokemon_container");
    let card = document.createElement("div");
    let name = document.createElement("h2");
    let id = document.createElement("h3");
    let image = document.createElement("img");
    let weight = document.createElement("p");
    let height = document.createElement("p");
    let abilities = document.createElement("p");

    let kilos = poke_info.weight / 10
    let cms = poke_info.height * 10

    name.innerHTML = poke_info.name;
    id.innerHTML = "No. " + poke_info.id;
    image.src = poke_info.sprites.front_default;
    image.alt = "Sprite de " + poke_info.name;
    weight.innerHTML = "Peso: " + kilos + " kg";
    height.innerHTML = "Altura: " + cms + " cm";
    abilities.innerHTML = "Habilidades: " + poke_info.abilities.map(ability => ability.ability.name).join(', ');

    card.classList.add("pokemon_card")

    card.appendChild(name);
    card.appendChild(id);
    card.appendChild(image);
    card.appendChild(weight);
    card.appendChild(height);
    card.appendChild(abilities);

    container.appendChild(card);

}

// Obtener datos de la API //
const getData = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data);

        data.results.forEach(async (element) => {
            const information = await fetch(element.url);
            const poke_info = await information.json();

            printData(poke_info)
        });

        let showItem;
        let hideItem;
        hideItem = document.getElementById('loading');
        hideItem.classList.add("hidden");
        showItem = document.getElementById('pokemon_container');
        showItem.classList.remove("hidden");

    } catch (error) {
        console.error(error);
        return error;
    }
};

getData();


// evento load y DOMContentLoaded

