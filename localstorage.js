function saveLocalstorage(key, value){
    localStorage.setItem(key, value)
}

function getLocalstorage(key){
    return localStorage.getItem(key)
}

export {saveLocalstorage, getLocalstorage}