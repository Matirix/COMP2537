function addtolist() {
    // to be added in pokelist
    $.post('/addtolist', {
        pokeID: id,
        pokeName: pName,
        pokeWeight: weight,
        quantity: 1

    },  
    (res) => console.log(res),
    alert("Successfully added pokemon")
    
)}


function setup(){
    // console.log($(".weight").val())
    // console.log($("#pkname").text())
    console.log(weight)



}

$(document).ready(setup)