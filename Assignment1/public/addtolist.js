// ADD TO LIST CALLED VIA ONCLICK
function addtolist() {
    // to be added in pokelist
    $.post('/addtolist', {
        pokeID: id,
        pokeName: pName,
        pokeWeight: weight,
        quantity: 1

    },  
    (res) => alert(res),

    
)}



function setup(){

}

$(document).ready(setup)