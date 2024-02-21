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

/* Skicka in value som matchar med planet.name. Använd någon filter funktion här.
Detta kommer göra att planetsApi retunerar det valda objektet som jag sen kan använda i tellus.js

Jag har en array med 9 objekt. Jag vill få ut ett objekt där objektets namn matchar mitt input value
*/