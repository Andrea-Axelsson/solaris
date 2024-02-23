// Denna JavaScript-modul implementerar sökfunktionalitet för ett solsystem-explorer UI, inklusive 
// autokomplettering av planetnamn, validering av användarinmatning, och hantering av användarval 
// genom att spara dem i local storage.


// Importera funktion för att spara data i webbläsarens local storage.
import {saveLocalstorage} from "./localstorage.js"

// Hämta sökknappen från DOM.
const searchButton = document.getElementById("search-button")

// Deklarera variabler för att lagra sökförslag och användarens inmatning.
let suggestionPlanetSearch = ""
let inputPlanetSearch = ""

// Hämta sökrutan från DOM.
const searchBox = document.getElementById("search-box")

// Lista med förslag på planeter och solen.
const suggestions = ["Merkurius", "Venus", "Jorden", "Mars", "Jupiter", "Saturnus", "Solen","Uranus", "Neptunus"]

// Funktion för att hantera sökförslag.
function searchSuggestion() {
    // Formatera användarens inmatning: Första bokstaven stor, resten små.
    inputPlanetSearch = searchBox.value.charAt(0).toUpperCase() + searchBox.value.slice(1).toLowerCase()
    
    // Hämta elementet för att visa sökförslag.
    let suggestionBox = document.getElementById('suggestion-box')
    suggestionBox.innerHTML = ""

    // Om det finns inmatning, generera och visa förslag.
    if (inputPlanetSearch.length > 0) {
        suggestions.forEach(suggestion => {
            // Formatera varje förslag på samma sätt som användarens inmatning.
            let formattedSuggestion = suggestion.charAt(0).toUpperCase() + suggestion.slice(1).toLowerCase()
            // Om ett förslag matchar inmatningen, skapa och visa det.
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

// Funktion för att kontrollera stavningen av planetnamn.
function spellPlanet(e){
    console.log(inputPlanetSearch)
    // Kontrollera om inmatningen matchar något namn i förslagslistan.
    if(suggestions.find(suggestion => suggestion === inputPlanetSearch)){
        document.querySelector('.solaris__error-message').style.display = 'none'
        
    }else{
        // Om inmatningen inte matchar, visa felmeddelande.
        e.preventDefault()
        document.querySelector('.solaris__error-message').style.display = 'flex'
    }
}

// Funktion för att hantera val av ett förslag.
function selectSuggestion(value) {
    // Sätt valt förslag och uppdatera sökrutan och inmatningsvariabeln.
    suggestionPlanetSearch = value
    searchBox.value = value
    inputPlanetSearch = value
    // Töm förslagslådan.
    document.getElementById('suggestion-box').innerHTML = ""
}

// Gör funktionen searchSuggestion tillgänglig globalt.
window.searchSuggestion = searchSuggestion

// Lägg till en eventlyssnare på sökknappen.
searchButton.addEventListener("click", searchPlanet)

// Funktion för att hantera sökning efter planet.
function searchPlanet(e){
    // Spara valt förslag och inmatning i local storage.
    saveLocalstorage("suggestionPlanetSearch", suggestionPlanetSearch)
    saveLocalstorage("inputPlanetSearch", inputPlanetSearch)
    // Kontrollera stavningen och genomför sökningen.
    spellPlanet(e)
}