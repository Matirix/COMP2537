function get_pokemon_f() {
    console.log("working from get_pokemon_f")
    pokemon = $("#poke_name").val();
    
    $.ajax(
        {
            "url":`https://pokeapi.co/api/v2/pokemon/${pokemon}`,
            "type": "GET",
            "success": display
        }
    )
}

function get_pokemon_home(pokename) {
    console.log("working from get_pokemon_f")
    // pokemon1 = $("#poke_name").val();

    $.ajax(
        {
            "url":`https://pokeapi.co/api/v2/pokemon/${pokename}`,
            "type": "GET",
            "success": display
        }
    )
}


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
    // console.log("Random_nums succ")
    // console.log(random_poke_list)
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



function display(data) {
    console.log("display")
    console.log(data)
    picture = (data['sprites']['other']['official-artwork']['front_default']);
    $("#name").html(data.species.name);
    $("#type").html(data['types'][0]['type']['name']);
    $("#picture").html(`<img src=${picture}>`);
    $("#abilities").html(JSON.stringify(data['abilities']))

}




function setup() {
    // main_display();
    // random_pokemon_f();
    random_nums();
    console.log(random_poke_list);
    $('#get_pokemon').click(get_pokemon_f);



}

$(document).ready(setup)