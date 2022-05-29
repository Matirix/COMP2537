// Name
usrinput = null;
inputtype = null;
habitat = null;
function get_pokemon_f() {

    console.log("working from get_pokemon_f")
    usrinput = $("#poke_name").val();
    inputtype = $('input[name=select]:checked', '#radiobuttons').val()
    console.log(usrinput)
    $.ajax(
        {
            "url":`https://pokeapi.co/api/v2/${inputtype}/${usrinput}`,
            "type": "GET",
            "success": display,
            "error": failure
        }
    )
}

//Failure

function failure() {
    $(".cards").show();
    $(".cards").html(`${usrinput} is not a(n) ${inputtype}`);

}
//Display
function display(data) {
    console.log(data)
    $(".cards").empty();
    $(".cards").show();
    $('.stats').show();
    $('#history').show();


    if (inputtype == "ability") {
        // $("#card").hide()
        // console.log(usrinput)
        ability_array();

    } 
    else if (inputtype == "pokemon-habitat") {
        habitat_array(data);

    } 
    else {
        image = (data['sprites']['other']['official-artwork']['front_default']);

        $(".cards").append(`
        <a class="x" href="/profile/${data.id}" onclick="addnewpokeevent(${data.id})"> 
        <h1 class='fadein' style="padding-left:10px">${data.id}</h1>
        <img class='img_cont pokename' id=${data.species.name} src=${image}>
        <h1 class='fadein' style="text-align:center;">${data.species.name}</h1>
        </a>`);

    
        $("#historydd").append(`<option value=${data.species.name}>` + data.species.name + "</option>");

    }
}


//ability
function ability_array() {
    $('#card').hide();
    $(".cards").empty();
    $('.cards').show();
    console.log(usrinput)
    $("#historydd").append(`<option value=${usrinput}>` + usrinput + "</option>");

    for (i = 0; i != 500; i++){
        $.ajax(
            {
                "url":`https://pokeapi.co/api/v2/pokemon/${i}`,
                "type": "GET",
                "success": displayabilityarray
            }
        )
    }
    
}


function displayabilityarray(data) {
    console.log(data.abilities[0].ability.name)
    usrinput = $("#poke_name").val();
    console.log(usrinput);
    image = (data['sprites']['other']['official-artwork']['front_default']);

    if (usrinput == data.abilities[0].ability.name) {
        console.log(data.abilities[0].ability.name)
        console.log(data.name)
        $(".cards").append(`
        <a class="x" href="/profile/${data.id}" onclick="addnewpokeevent(${data.id})"> 
        <h1 class="fadein"style=" padding-left:10px">${data.id}</h1>
        <img class='img_cont pokename' id=${data.species.name} src=${image} width="100%">
        <h1 class="fadein" style="text-align:center;">${data.species.name}</h1>
        </a>`);

    }       
}

//habitat
function habitat_array(data) {
    $('#card').hide();
    $(".cards").empty();
    $('.cards').show();
    habitat = data
    console.log(usrinput)
    $("#historydd").append(`<option value=${usrinput}>` + usrinput + "</option>");

    for (i = 0; i != 500; i++){
        $.ajax(
            {
                "url":`https://pokeapi.co/api/v2/pokemon/${i}`,
                "type": "GET",
                "success": displayhabitatarray
            }
        )
    }
    
}

function displayhabitatarray(data) {
    console.log(habitat.pokemon_species.length)
    usrinput = $("#poke_name").val();
    image = (data['sprites']['other']['official-artwork']['front_default']);

    for (i = 0; i != habitat.pokemon_species.length; i++) {
        if (habitat.pokemon_species[i].name == data.species.name) {
            $(".cards").append(`
            <a class="x" href="/profile/${data.id}" onclick="addnewpokeevent(${data.id})"> 
            <h1 class="fadein" style="padding-left:10px">${data.id}</h1>
            <img class='img_cont pokename' id=${data.species.name} src=${image} width="100%">
            <h1 class="fadein" style="text-align:center;">${data.species.name}</h1>
            </a>`);
        }
    }
}


//Search array
function get_pokemon_array (){
    $('#card').hide();
    $(".cards").empty();
    $('.cards').show();
    console.log($("#poketype option:selected").val())
    type = $("#poketype option:selected").val()

    for (i = 0; i != 1000; i++){
        $.ajax(
            {
                "url":`https://pokeapi.co/api/v2/pokemon/${i}`,
                "type": "GET",
                "success": displaypokelist
            }
        )
    }
}

function displaypokelist(data){
    image = (data['sprites']['other']['official-artwork']['front_default']);
    // console.log(image)
    // console.log(type)
    if (type == data.types[0].type.name) {
        $(".cards").append(`
        <a class="x" href="/profile/${data.id}" onclick="addnewpokeevent(${data.id})"> 
        <h1 class="fadein" style="padding-left:10px">${data.id}</h1>
        <img class='img_cont pokename' id=${data.species.name} src=${image} width="100%">
        <h1 class="fadein" style="text-align:center;">${data.species.name}</h1>
        </a>`);
    }       


}

//Homepage2
function parsed_poke_list (rpoke) {

    random_poke_list.push(rpoke)
    image = (rpoke['sprites']['other']['official-artwork']['front_default']);
    $(".picsrow").append(`
    <a class="x"  src=${image} href="/profile/${rpoke.id}" onclick="addnewpokeevent(${rpoke.id})"> 
    <h1 class="fadein" style="padding-left:10px">${rpoke.id}</h1>
    <img class='img_cont pokename' id=${rpoke.species.name} src=${image} width="100%">
    <h1 class="fadein" style="text-align:center;">${rpoke.species.name}</h1>
    </a>`);
}



//Homepage1
random_poke_index =[]
function random_nums() {
    // Random numbers
    console.log("from Random_num")
    random_poke_index = []
    for (i = 0; i < 12; i++) {
        random_poke_index.push(Math.floor((Math.random() * 897) + 1))
    }
    console.log(random_poke_index)

    random_poke_list = []
    //Random pokemon get
    for (i = 0; i <= random_poke_index.length; i++) {
        $.ajax(
            {
                "url":`https://pokeapi.co/api/v2/pokemon/${random_poke_index[i]}`,
                "type": "GET",
                "success": parsed_poke_list
            }
        )
    }
}


//for Type
function type_list() {
    console.log("working from type")
        $.ajax(
            {
                "url":`https://pokeapi.co/api/v2/type/`,
                "type": "GET",
                "success": poketypeoptions
            }
        )
    }


function poketypeoptions(data) {
    console.log(data)
    $("#poketype").empty();
    for (i=0; data.results.length; i++) {
        $("#poketype").append(`<option value="${data.results[i].name}">${data.results[i].name}</option>`)
    }
}


//History
function get_pokemon_history(){
    //URL
    console.log($("#historydd option:selected").val())
    inputtype = $('input[name=select]:checked', '#radiobuttons').val()
    x = ($("#historydd option:selected").val())
    $.ajax(
        {
            "url": `https://pokeapi.co/api/v2/${inputtype}/${x}`,
            "type": "GET",
            "success": display
        }
    )
}

function clear() {
    console.log("working")
    $("#historydd").html('');
}


// EVENT
function addnewevent() {
    console.log("From addnewevent function")
    date = new Date(Date.now());
    dateformatted = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    console.log(dateformatted)
    $.ajax({
        url: "/timeline/insert",
        type: "post",
        data: {
            action: `User searched for query ${usrinput} with the ${inputtype} option` ,
            time: `${dateformatted}`,
            likes: 1
        },
        success: (res)=>{console.log(res)}
    })
}
//EVENT
function addnewpokeevent(name) {
    console.log("Here we go")
    date = new Date(Date.now());
    dateformatted = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    console.log(dateformatted)

    $.ajax({
        url: "/timeline/insert",
        type: "post",
        data: {
            action: `You clicked on Pokemon id ${name}` ,
            // action: `You clicked on Pokemon id ${name} - http://localhost:16666/profile/${name}`
            time: `${dateformatted}`,
            likes: 1,
        },
        success: (res)=>{console.log(res)}
    })
}

function addnewpoketype(type) {
    console.log("Here we go")
    date = new Date(Date.now());
    dateformatted = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    console.log(dateformatted)

    $.ajax({
        // url: "https://young-tor-70220.herokuapp.com/timeline/insert",
        url: "/timeline/insert",
        type: "post",
        data: {
            action: `You filtered by ${type}` ,
            time: `${dateformatted}`,
            likes: 1,
        },
        success: (res)=>{console.log(res)}
    })
}

function didTheyWin(remaining) {
    date = new Date(Date.now());
    dateformatted = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    if (remaining > 1) {
        $.post('/timeline/insert', {
            action: `You lost the game, you're quite dog. you only had ${remaining} match left` ,
            time: `${dateformatted}`,
            likes: 1,
        })
    }
    if (remaining == 0) {$("#gameboard").html("Congratulations!")}
    if (!remaining) {
        $.post('/timeline/insert', {
            action: `Hurray you won the game!` ,
            time: `${dateformatted}`,
            likes: 1,
        })
    }

}


var cardsleft = 1
async function getcards(cards, columns, toWin) {
    cardsleft = toWin
    timer(120);
    $("#gameboard").empty();
    $("#gamehistorybox").empty();
    $("#gameboard").css("grid-template-columns",  `repeat(${columns}, 1fr)`);
    $("#gameboard").css("visibility", "visible");
    $("#gamehistory").css("visibility", "visible");
    random_num_list2 = []
    random_num_list = []
    for (i = 0; i < (cards/2); i++) {
        random_num_list.push(Math.floor((Math.random() * 800) + 1))
        random_num_list2.push(random_num_list[i])
    }
    let num_list =  random_num_list.concat(random_num_list2)

    for (i = 0; i < num_list.length; i++) {
        await $.get(`https://pokeapi.co/api/v2/pokemon/${num_list[i]}`).then(
            (data) => {
                image = (data.sprites.other["official-artwork"].front_default)
                // console.log(data)
                $("#gameboard").append(`
                <div class="gamecard inplay" id="pokemon_${i}">
                    <img class="back_face" src="./pokeball.png" alt="">
                    <img id="${i}" class="front_face" src="${image}" alt="">
                </div>
                `)

            }
        )
    }

}

function timer(timeinseconds) {
    var elem = $("#timer")
    var timerId = setInterval(countdown, 1000);
    function countdown() {  
        if (timeinseconds == -1 ) {
            clearTimeout(timerId);
            didTheyWin(cardsleft)
            $("#gameboard").html("We can't all be winners. Click a difficulty to try again chump")
        } else if (cardsleft === 0 ) {
            clearTimeout(timerId);
            elem.html("You completed in " + timeinseconds + 's');
        }
        else {
            elem.html(timeinseconds + 's');
            timeinseconds--;
        }
    }
}




function setup() {
    random_nums();
    $('#get_pokemon').click(get_pokemon_f); 
    $('#poke_history').on('click', get_pokemon_history)
    $("#poketype").on('click', type_list)
    $('.stats').hide();
    $('.cards').hide();
    $('#card').hide();
    $('#history').hide();
    $('#poketype').change(get_pokemon_array);
    $('#clear').click(clear)


    hasFlippedCard = false
    let firstCard, secondCard;
    $("#gameboard").on('click', '.inplay', function (){
        $(this).toggleClass("flip");
        if(!hasFlippedCard){
            firstCard = $(this).find('.front_face')[0]
            outercard1 = this.id
            hasFlippedCard = true;
        }else{
            secondCard = $(this).find('.front_face')[0]
            outercard2 = this.id
            //Stop pressing the card twice
            if (outercard1 == outercard2) {
                console.log("You cannot press same card twice")
                return hasFlippedCard = false
            }
            if (
                $(`#${firstCard.id}`).attr("src") 
                ==
                $(`#${secondCard.id}`).attr("src")
            ){
                console.log("a Match!");
                cardsleft --
                $(`#${outercard1}`).removeClass("inplay")
                $(`#${outercard2}`).removeClass("inplay")
                $(`#${outercard1}`).fadeTo("slow", 0)
                $(`#${outercard2}`).fadeTo("slow", 0)
                $("#gamehistorybox").append(`User successfully matched${outercard1} with ${outercard2} || Cards left ${cardsleft}<br>` )
                hasFlippedCard = false
                setTimeout(() => didTheyWin(cardsleft), 1500
                )
            }else{
                console.log("not a match!");
                setTimeout(function () {
                    $(`#${outercard1}`).toggleClass("flip"),
                    $(`#${outercard2}`).toggleClass("flip")
                }, 500)
                hasFlippedCard = false
            }
        }})

}

$(document).ready(setup)