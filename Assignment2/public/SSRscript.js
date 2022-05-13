// Name
usrinput = null;
inputtype = null;
habitat = null;


function get_pokemon_f() {

    console.log("working from get_pokemon_f")
    usrinput = $("#poke_name").val();
    inputtype = $('input[name=select]:checked', '#radiobuttons').val()
    console.log(usrinput)
    console.log(inputtype)

    addnewevent()
    $.ajax(
        {
            "url":`https://secret-sierra-49740.herokuapp.com/${inputtype}/${usrinput}`,
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

    } 
    else if (inputtype == "pokemon-habitat") {
        habitat_array(data);

    } 
    else {
        image = (data[0]['sprites']['other']['official-artwork']['front_default']);
        data = data[0]
        $(".cards").append(`
        <a class="x" href="/profile/${data.id}" onclick="addnewpokeevent(${data.id})"> 
        <h1 class='fadein' style="padding-left:10px">${data.id}</h1>
        <img class='img_cont pokename' id=${data.species.name} src=${image}>
        <h1 class='fadein' style="text-align:center;">${data.species.name}</h1>
        </a>`);

        $("#historydd").append(`<option value=${data.id}>` + data.species.name + "</option>");

    }
}


//ability - SSR
function ability_array() {
    $('#card').hide();
    $(".cards").empty();
    $('.cards').show();
    console.log(usrinput)
    $("#historydd").append(`<option value=${usrinput}>` + usrinput + "</option>");

    for (i = 0; i != 30; i++){
        $.ajax(
            {
                "url":`https://secret-sierra-49740.herokuapp.com/pokemon/${i}`,
                "type": "GET",
                "success": displayabilityarray
            }
        )
    }
    
}

//SSR
function displayabilityarray(data) {
    data = data[0]
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

//habitat - SSR
function habitat_array(data) {
    $('#card').hide();
    $(".cards").empty();
    $('.cards').show();
    habitat = data[0]
    console.log(habitat)
    console.log(usrinput)
    $("#historydd").append(`<option value=${usrinput}>` + usrinput + "</option>");

    for (i = 0; i != 30; i++){
        $.ajax(
            {
                "url":`https://secret-sierra-49740.herokuapp.com/pokemon/${i}`,
                "type": "GET",
                "success": displayhabitatarray
            }
        )
    }
    
}

//SSR 
function displayhabitatarray(data) {

    data = data[0]

    usrinput = $("#poke_name").val();
    // console.log(data.sprites.other["official-artwork"].front_default)
    image = (data.sprites.other["official-artwork"].front_default);
    //loops through the length of pokemon species name in the habitat data
    for (i = 0; i != habitat.pokemon_species.length; i++) {
        if (habitat.pokemon_species[i].name == data.species.name) {
            $(".cards").append(`
            <a class="x" href="/profile/${data.id}" "onclick="addnewpokeevent(${data.id})"> 
            <h1 class="fadein" style="padding-left:10px">${data.id}</h1>
            <img class='img_cont pokename' id=${data.species.name} src=${image} width="100%">
            <h1 class="fadein" style="text-align:center;">${data.species.name}</h1>
            </a>`);
        }
    }
}


//Search array - TYPE - SSR
function get_pokemon_array (){
    $('#card').hide();
    $(".cards").empty();
    $('.cards').show();
    console.log($("#poketype option:selected").val())
    type = $("#poketype option:selected").val()
    addnewpoketype(type);
    for (i = 0; i != 30; i++){
        $.ajax(
            {
                "url":`https://secret-sierra-49740.herokuapp.com/pokemon/${i}`,
                "type": "GET",
                "success": displaypokelist
            }
        )
    }
}

function displaypokelist(data){
    data = data[0]
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

//Homepage2 - SSR
function parsed_poke_list (rpoke) {
    // console.log(rpoke)
    random_poke_list.push(rpoke)
    image = (rpoke[0].sprites.other["official-artwork"].front_default);
    pokename = rpoke[0].species.name 
    $(".picsrow").append(`
    <a class="x"  src=${image} href="/profile/${rpoke[0].id}" onclick="addnewpokeevent(${rpoke[0].id})"> 
    <h1 class="fadein" style="padding-left:10px">${rpoke[0].id}</h1>
    <img class='img_cont pokename' id=${rpoke[0].species.name} src=${image} width="100%">
    <h1 class="fadein" style="text-align:center;">${rpoke[0].species.name}</h1>
    </a>`);
}



//Homepage1 - SSR
random_poke_index =[]
function random_nums() {
    // Random numbers
    console.log("from Random_num")
    random_poke_index = []
    for (i = 0; i < 12; i++) {
        random_poke_index.push(Math.floor((Math.random() * 29) + 1))
    }
    console.log(random_poke_index)

    random_poke_list = []
    //Random pokemon get
    for (i = 0; i <= random_poke_index.length; i++) {
        $.ajax(
            {
                "url":`https://secret-sierra-49740.herokuapp.com/pokemon/${random_poke_index[i]}`,
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
                "url":`https://secret-sierra-49740.herokuapp.com/type`,
                "type": "GET",
                "success": poketypeoptions
            }
        )
    }


function poketypeoptions(data) {
    // data = data[0]
    console.log(data)
    $("#poketype").empty();
    for (i=0; data.length; i++) {
        $("#poketype").append(`<option value="${data[i].name}">${data[i].name}</option>`)
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
            "url":`https://secret-sierra-49740.herokuapp.com/${inputtype}/${x}`,
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
        url: "https://secret-sierra-49740.herokuapp.com/timeline/insert",
        type: "put",
        data: {
            action: `User searched for query ${usrinput} with the ${inputtype} option` ,
            time: `${dateformatted}`,
            likes: 1
        },
        success: (res)=>{console.log(res)}
    })
}

function addnewpokeevent(name) {
    console.log("Here we go")
    date = new Date(Date.now());
    dateformatted = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    console.log(dateformatted)

    $.ajax({
        url: "https://secret-sierra-49740.herokuapp.com/timeline/insert",
        type: "put",
        data: {
            action: `User clicked on Pokemon id ${name} - https://secret-sierra-49740.herokuapp.com/profile/${name}` ,
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
        url: "https://secret-sierra-49740.herokuapp.com/timeline/insert",
        type: "put",
        data: {
            action: `User filtered by ${type}` ,
            time: `${dateformatted}`,
            likes: 1,
        },
        success: (res)=>{console.log(res)}
    })
}




function setup() {
    random_nums();
    // console.log(random_poke_list);
    $('#get_pokemon').click(get_pokemon_f); 
    $('#poke_history').on('click', get_pokemon_history)
    $("#poketype").on('click', type_list)
    $('.stats').hide();
    $('.cards').hide();
    $('#card').hide();
    $('#history').hide();
    $('#poketype').change(get_pokemon_array);
    $('#clear').click(clear)

    




}

$(document).ready(setup)