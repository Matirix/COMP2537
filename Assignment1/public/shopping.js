//TO ROUND
function trunc(num) {
    (Math.round(num * 100) / 100).toFixed(2);

}

//DISPLAY SHOPPING LIST
function displayshoplist() {
    pretax = 0
    $.get('/shoplist', (data)=>{

        shoppinglist = data[0].pokuisine
        // i = 0

        if (shoppinglist === undefined || shoppinglist.length == 0) {
            $("#items").html("You have nothing!")
            return;
        }

        for (i = 0; i < shoppinglist.length; i++) {
            // id = shoppinglist[i].pID
            // weight = shoppinglist[i].weight
            // quantity = shoppinglist[i].quantity
            // var pokemon = new Pokemon(id, weight, quantity)
            $("#items").append(`
            <div id="this_${shoppinglist[i].pID}" class="shopcards "style="display:flex;"> 
            <img src="${shoppinglist[i].img}" width="30%">
            <p width="70%">
            #PokeID: <span number="${shoppinglist[i].pID}"> ${shoppinglist[i].pID} </span> | 
            <span id="weight"> ${shoppinglist[i].weight}lb </span>| 
            # of orders: <span id="quantity"> ${shoppinglist[i].quantity} </span>
            <button class=".delete_order" id="${shoppinglist[i].pID}" onclick="delete_item(${shoppinglist[i].pID})"> Remove </button> 
            <button class=".update_order" id="${shoppinglist[i].pID}" onclick="uporder(${shoppinglist[i].pID})"> + </button> 
            </p> 
            </div>

            `)
            pretax += (parseInt(shoppinglist[i].weight) * parseInt(shoppinglist[i].quantity))
            // pretax += parseInt(shoppinglist[i].weight)
            $(".pretax").html("$" + pretax)
        }
        total = pretax * 1.13
        tax = total - pretax
        $(".tax").html("$" + tax.toFixed(2))
        $(".total").html("$" + total.toFixed(2))
    })
    // total = pretax * 1.13
    // tax = total - pretax
    // $(".tax").html("$" + tax.toFixed(2))
    // $(".total").html("$" + total.toFixed(2))

}
//GREETING
function greeting() {
    console.log("greeting")
    $.get('/guest', (data) => $("#guest").html(data))
}

//DELETE ITEM
async function delete_item(item) {
    $(`#this_${item}`).empty()
    await $.post('/delete_item', {
        pokemonID: item
    }).then(
        (data) => console.log($(`#this_${item}`))
    ) 
}

//UPDATE ITEM 
async function uporder(item) {
    await $.post('/uporder', {
        pokemonID: item
    }).then (
        //Need to lower the scope
        (data) => alert("Added, please refresh the page to see the details agian.")
        // (data) =>  $("#quantity").html(data.pokuisine[0].quantity)
        )
}

//SEND ORDER
async function send_order(){
    total_money = $(".total").text()
    poke_id = '';
    date = new Date(Date.now());
    dateformatted = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    await $.get('/shoplist', (data)=> {
        console.log(data)
        shoppinglist = data[0].pokuisine
        for (i = 0; i < shoppinglist.length; i++) {
            poke_id += shoppinglist[i].pID + ", "
        }
    })
    console.log(poke_id)
    $.post('/timeline/insert', {
        action: `You have successfully submitted an order with the pokemon ID's of ${poke_id}`,
        time: dateformatted,
        like: 1
    })
    alert("Order sent!")
    $.post('/emptyshoplist', data =>  $('body').replaceWith(data))


}

greeting();
displayshoplist();
// guest();