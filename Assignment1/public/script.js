// Name
usrinput = null;
inputtype = null;

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

//failure

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

    } else {
        image = (data['sprites']['other']['official-artwork']['front_default']);

        $(".cards").append(`
        <a class="x" href="/profile/${data.id}"> 
        <h1 style="padding-left:10px">${data.id}</h1>
        <img class='img_cont pokename' id=${data.species.name} src=${image}>
        <h1 style="text-align:center;">${data.species.name}</h1>
        </a>`);

        //Code to display the Pokemon without redirecting to another page

        // // For the abilities
        // $("#abilities").html("");
        // for (i=0; i != data.abilities.length; i++) {
        //     skills = data.abilities[i].ability.name
        //     $("#abilities").append("<li>" + skills + "</li>") 

        // }
        // $(".basestat").html("");
        // for (i=0; i != data.stats.length; i++) {
        //     statname = data.stats[i].stat.name
        //     // stateffort = data.stats[i].effort
        //     basestats = data.stats[i].base_stat

        //     console.log(basestats)
        //     $(".basestat").append(statname + ": " + basestats + "<br>") 

        // }

        $("#historydd").append(`<option value=${data.species.name}>` + data.species.name + "</option>");
        // $("#pkname").html(data.species.name);
        // $("#type").html(data['types'][0]['type']['name']);
        // $(".picture").html(`<img src=${picture}>`);
        // $(".height").html("Height: " + data.height);    
        // $(".weight").html("Weight: " + data.weight);
    }
}


//ability
function ability_array() {
    $('#card').hide();
    $(".cards").empty();
    $('.cards').show();
    console.log(usrinput)
    $("#historydd").append(`<option value=${usrinput}>` + usrinput + "</option>");

    for (i = 0; i != 1000; i++){
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
        <a class="x" href="/profile/${data.id}"> 
        <h1 style="padding-left:10px">${data.id}</h1>
        <img class='img_cont pokename' id=${data.species.name} src=${image} width="100%">
        <h1 style="text-align:center;">${data.species.name}</h1>
        </a>`);

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
        <a class="x" href="/profile/${data.id}"> 
        <h1 style="padding-left:10px">${data.id}</h1>
        <img class='img_cont pokename' id=${data.species.name} src=${image} width="100%">
        <h1 style="text-align:center;">${data.species.name}</h1>
        </a>`);
    }       


}

//Front Page Pokemon
function parsed_poke_list (rpoke) {

    random_poke_list.push(rpoke)
    image = (rpoke['sprites']['other']['official-artwork']['front_default']);
    $(".picsrow").append(`
    <a class="x"  src=${image} href="/profile/${rpoke.id}"> 
    <h1 style="padding-left:10px">${rpoke.id}</h1>
    <img class='img_cont pokename' id=${rpoke.species.name} src=${image} width="100%">
    <h1 style="text-align:center;">${rpoke.species.name}</h1>
    </a>`);
}

//History
function get_pokemon_history(){
    //URL
    console.log($("#historydd option:selected").val())
    x = ($("#historydd option:selected").val())
    $.ajax(
        {
            "url": `https://pokeapi.co/api/v2/pokemon/${x}`,
            "type": "GET",
            "success": display
        }
    )
}

//Homepage
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








function setup() {
    random_nums();
    console.log(random_poke_list);
    $('#get_pokemon').click(get_pokemon_f); 
    $('#poke_history').on('click', get_pokemon_history)
    $("#poketype").on('click', type_list)
    $('.stats').hide();
    $('.cards').hide();
    $('#card').hide();
    $('#history').hide();
    $('#poketype').change(get_pokemon_array);





}

$(document).ready(setup)