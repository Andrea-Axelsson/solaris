import planetsApi from "./fetchApi.js"
import {getLocalstorage} from "./localstorage.js"

const planetFactContainer = document.getElementById("planet-fact-container")
let suggestionPlanetSearch = getLocalstorage("suggestionPlanetSearch")
let inputPlanetSearch = getLocalstorage("inputPlanetSearch")
const planetColors ={
    "Merkurius": "#888888",
    "Venus": "#E7CDCD",
    "Jorden": "#428ED4",
    "Mars": "#EF5F5F",
    "Jupiter": "#E29468",
    "Saturnus": "#C7AA72",
    "Uranus": "#C9D4F1",
    "Neptunus": "#7A91A7",
}

function getMatchingPlanet(planets, searchQuery){
    return planets.find(planet => planet.name === searchQuery)
}

function getPlanetFactHtml(planet){

    if (!planet){
        return '<p>Planet information is not available.</p>'
    }

   let html = `
   <article class="planet-article__planet-big" style="background-color: ${planetColors[planet.name]}"></article>

            <section class="planet-article__content">
                <h1 class="title-heading">${planet.name}</h1>
                <h2 class="title-subheading">${planet.latinName}</h2>
                <p class="planet-article__body-text">${planet.desc}</p>
                <hr class="planet-article__divider">
                <div class="planet-article__facts-grid">

                        <article class="planet-fact">
                            <h3 class="planet-fact__title">OMKRETS</h3>
                            <p class="planet-article__body-text">${planet.circumference}</p>
                        </article>
                        <article class="planet-fact">
                            <h3 class="planet-fact__title">KM FRÅN SOLEN</h3>
                            <p class="planet-article__body-text">${planet.distance} km</p>
                        </article>
                        <article class="planet-fact">
                            <h3 class="planet-fact__title">MAX TEMPERATUR</h3>
                            <p class="planet-article__body-text">${planet.temp.day}C</p>
                        </article>
                        <article class="planet-fact">
                            <h3 class="planet-fact__title">MIN TEMPERATUR</h3>
                            <p class="planet-article__body-text">${planet.temp.night}C</p>
                        </article>
                </div>
                
                    <hr class="planet-article__divider">
                    <article class="planet-fact">
                        <h3 class="planet-fact__title">MÅNAR</h3>
                        <p class="planet-article__body-text">${planet.moons.join(', ')}</p>
                    </article>
        </section>
        <a href="index.html" class="planet-article__back-button">TILLBAKA</a>
        `
        
        return html
}

planetsApi().then(planets => {
    let planet

    if (suggestionPlanetSearch){
        planet = getMatchingPlanet(planets, suggestionPlanetSearch)
    }else if (inputPlanetSearch) {
        planet = getMatchingPlanet(planets, inputPlanetSearch)
    }

    if (planet) {
        console.log("Matched Planet:", planet);
    } else {
        console.log("No matching planet found");
    }

    let planetHtml = getPlanetFactHtml(planet)
    planetFactContainer.innerHTML = planetHtml
})
