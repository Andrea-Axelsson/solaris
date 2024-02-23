// Denna modul tillhandahåller funktionalitet för att spara och hämta data från webbläsarens localStorage,
// vilket möjliggör persistent lagring av användardata mellan sessioner. Innehåller funktioner för att 
// sätta och få värden baserade på unika nycklar.


// Funktion för att spara data i webbläsarens localStorage.
function saveLocalstorage(key, value){
    // Använder localStorage.setItem för att lagra ett värde associerat med en nyckel.
    localStorage.setItem(key, value)
}

// Funktion för att hämta data från webbläsarens localStorage.
function getLocalstorage(key){
    // Använder localStorage.getItem för att hämta ett värde associerat med en nyckel.
    return localStorage.getItem(key)
}

// Exporterar funktionerna så att de kan användas i andra delar av applikationen.
export {saveLocalstorage, getLocalstorage}