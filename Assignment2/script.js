// Name
inputtype = null;
function get_pokemon_f() {
    $('.stats').show();
    $('#history').show();
    console.log("working from get_pokemon_f")
    pokemon = $("#poke_name").val();
    inputtype = $('input[name=select]:checked', '#radiobuttons').val()
    console.log(inputtype)

    $.ajax(
        {
            "url":`https://pokeapi.co/api/v2/${inputtype}/${pokemon}`,
            "type": "GET",
            "success": display
        }
    )
}


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

function display(data) {
    console.log(inputtype + "from display")
    if (inputtype == "type") {
        $("#right").hide();
        console.log("Type is successful")
        names = []
        for (i = 0; i != data.pokemon.length; i++) {
            names.push(data.pokemon[i].pokemon.name + "<br>")
        }

        $("#picture").html(names);

    } else {
        picture = (data['sprites']['other']['official-artwork']['front_default']);

        // For the abilities
        $("#abilities").html("");
        for (i=0; i != data.abilities.length; i++) {
            skills = data.abilities[i].ability.name
            $("#abilities").append("<li>" + skills + "</li>") 

        }



        $("#historydd").append(`<option value=${data.species.name}>` + data.species.name + "</option>");
        $("#pkname").html(data.species.name);
        $("#type").html(data['types'][0]['type']['name']);
        $("#picture").html(`<img src=${picture}>`);
        $(".weight").html("Weight: " + data.weight);

    }



}


// --------------------------------------------

//Homepage
// function get_pokemon_home(pokename) {
//     console.log("working from get_pokemon_f")
//     // pokemon1 = $("#poke_name").val();

//     $.ajax(
//         {
//             "url":`https://pokeapi.co/api/v2/pokemon/${pokename}`,
//             "type": "GET",
//             "success": display
//         }
//     )
// }

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

function parsed_poke_list (rpoke) {
    // console.log(rpoke['height']);
    random_poke_list.push(rpoke)
    image = (rpoke['sprites']['other']['official-artwork']['front_default']);
    $(".picsrow").append(`<a class='img_content'><img onclick="reveal(this.id)" class='pokename' id=${rpoke.species.name} src=${image} width="100%"></a>`);
}

function reveal(child) {
    window.location.href = "./search.html";
    console.log(child);
    get_pokemon_home(child);

}








function setup() {
    // main_display();
    // random_pokemon_f();
    random_nums();
    console.log(random_poke_list);
    $('#get_pokemon').click(get_pokemon_f);
    $('#poke_history').on('click', get_pokemon_history)
    $('.stats').hide();
    $('#history').hide();




}

$(document).ready(setup)