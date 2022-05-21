//TO ROUND
function trunc(num) {
    (Math.round(num * 100) / 100).toFixed(2);

}

//DISPLAY SHOPPING LIST
async function displayshoplist() {
    pretax = 0
    await $.get('/shoplist', (data)=>{

        shoppinglist = data[0].pokuisine
        console.log(shoppinglist[0].pID)
        if (shoppinglist == undefined) {
            $("#items").html("You have nothing!")
            return;
        }
        for (i = 0; i < shoppinglist.length; i++) {
            $("#items").append(`
            <p> 
            ${shoppinglist[i].pID} with weight: ${shoppinglist[i].weight} and quantity of ${shoppinglist[i].quantity} 
            <button class=".delete_order" id="${shoppinglist[i].pID}" onclick="delete_item(${shoppinglist[i].pID})"> delete </button> 
            </p>
            `)
            pretax += parseInt(shoppinglist[i].weight)
            $(".pretax").html("$" + pretax)
        }
    })
    total = pretax * 1.13
    tax = total - pretax
    $(".tax").html("$" + tax.toFixed(2))
    $(".total").html("$" + total.toFixed(2))

}
//GREETING
function greeting() {
    console.log("greeting")
    $.get('/guest', (data) => $("#guest").html(data))
}

function delete_item(item) {
    console.log(item)
    $.post('/delete_item', {
        pokemonID: item
    })
}

//SEND ORDER
void function send_order(){
    total_money = $(".total").text()
    poke_id = []
    $.get('/shoplist', (data)=> {
        console.log(data)
        shoppinglist = data[0].pokuisine
        for (i = 0; i < shoppinglist.length; i++) {
            poke_id.push(shoppinglist[i].pID)
        }
    })
    $.post('/send_order', data = {

    })
    

}

greeting();
displayshoplist();
// guest();