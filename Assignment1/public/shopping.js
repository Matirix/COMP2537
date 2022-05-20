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
        for (i = 0; i < shoppinglist.length; i++) {
            $("#items").append(`
            <p> ${shoppinglist[i].pID} with weight: ${shoppinglist[i].weight} and quantity of ${shoppinglist[i].quantity} </p>
            `)
            pretax += parseInt(shoppinglist[i].weight)
            $(".pretax").html(pretax)
        }
    })
    total = pretax * 1.13
    tax = total - pretax
    $(".tax").html(tax.toFixed(2))
    $(".total").html(total.toFixed(2))

}
//GREETING
function greeting() {
    console.log("greeting")
    $.get('/guest', (data) => $("#guest").html(data))
}

greeting();


displayshoplist();
// guest();