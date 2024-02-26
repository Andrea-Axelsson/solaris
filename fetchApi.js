/**
 * Denna modul exporterar en asynkron funktion som hanterar hämtning av planetdata från en extern API.
 * Funktionen gör först ett API-anrop för att få en API-nyckel och använder sedan denna nyckel för att göra ett andra
 * anrop för att hämta information om olika planeter. Den hanterar eventuella fel under processen och returnerar
 * planetdatan som ett JSON-objekt.
 */

// Exporterar en asynkron funktion som hämtar planetdata från en API.
export default async function planetsApi(inputPlanetSearch){

    try {
        const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
            method: 'POST'
        })
        const apiKey = await response.json()
        try {
            const response_1 = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
                method: 'GET',
                headers: { 'x-zocom': apiKey.key }
            })
            const data = await response_1.json()
            const planets = data.bodies
            console.log("planets", planets)
            return planets
        } catch (error) {
            return console.error('Error', error)
        }
    } catch (error_1) {
        return console.error('Error:', error_1)
    }

}