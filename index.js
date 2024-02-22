import {saveLocalstorage} from "./localstorage.js"

const searchButton = document.getElementById("search-button")

let suggestionPlanetSearch = ""
let inputPlanetSearch = ""
const searchBox = document.getElementById("search-box")
const suggestions = ["Merkurius", "Venus", "Jorden", "Mars", "Jupiter", "Saturnus", "Solen","Uranus", "Neptunus"]

/* Skapar serachsuggestion elementet */

function searchSuggestion() {
    inputPlanetSearch = searchBox.value.charAt(0).toUpperCase() + searchBox.value.slice(1).toLowerCase()
    
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

function spellPlanet(e){
    console.log(inputPlanetSearch)
    if(suggestions.find(suggestion => suggestion === inputPlanetSearch)){
        document.querySelector('.solaris__error-message').style.display = 'none'
        
    }else{
        e.preventDefault()
        document.querySelector('.solaris__error-message').style.display = 'flex'
    }
}

/* Lägger in suggestion i input text */

function selectSuggestion(value) {
    suggestionPlanetSearch = value
    searchBox.value = value
    inputPlanetSearch = value
    document.getElementById('suggestion-box').innerHTML = ""
}

window.searchSuggestion = searchSuggestion

searchButton.addEventListener("click", searchPlanet)

/* Man klickar på sök och sparar värdena i local storage */

function searchPlanet(e){
    saveLocalstorage("suggestionPlanetSearch", suggestionPlanetSearch)
    saveLocalstorage("inputPlanetSearch", inputPlanetSearch)
    spellPlanet(e)
}
