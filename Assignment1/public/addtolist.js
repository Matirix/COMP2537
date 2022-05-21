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

    addtoorder(id, pName)
    
)}

function addtoorder(number, name) {
    console.log("Here we go")
    console.log(number, name)
    date = new Date(Date.now());
    dateformatted = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    console.log(dateformatted)
    $.post("http://localhost:16666/timeline/insert", {
        action: `You added #${number} - ${name} to your order`,
        time: `${dateformatted}`,
        likes: 1
    },
    (res) => console.log("successfully added")

    )
}




function setup(){

}

$(document).ready(setup)