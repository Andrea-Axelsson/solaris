import {saveLocalstorage} from "./localstorage.js"

const searchButton = document.getElementById("search-button")

let suggestionPlanetSearch = ""
let inputPlanetSearch = ""
const searchBox = document.getElementById("search-box")

function searchSuggestion() {
    inputPlanetSearch = searchBox.value.charAt(0).toUpperCase() + searchBox.value.slice(1).toLowerCase()
    const suggestions = ["Merkurius", "Venus", "Jorden", "Mars", "Jupiter", "Saturnus", "Uranus", "Neptunus"]

    let suggestionBox = document.getElementById('suggestion-box')
    suggestionBox.innerHTML = ""

    if (inputPlanetSearch.length > 0) {
        suggestions.forEach(suggestion => {
            let formattedSuggestion = suggestion.charAt(0).toUpperCase() + suggestion.slice(1).toLowerCase()
            if (formattedSuggestion.startsWith(inputPlanetSearch)) {
                let suggestionElement = document.createElement("p")
                suggestionElement.textContent = suggestion
                suggestionElement.classList.add("suggestion-item")
                suggestionElement.onclick = function() { selectSuggestion(suggestion) }

                suggestionBox.appendChild(suggestionElement)
            }
        })
    }
}

function selectSuggestion(value) {
    suggestionPlanetSearch = value
    searchBox.value = value;
    document.getElementById('suggestion-box').innerHTML = ""
}

window.searchSuggestion = searchSuggestion


searchButton.addEventListener("click", searchPlanet)

function searchPlanet(){
    saveLocalstorage("suggestionPlanetSearch", suggestionPlanetSearch)
    saveLocalstorage("inputPlanetSearch", inputPlanetSearch)
}
