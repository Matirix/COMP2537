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

function random_nums() {
    // Random numbers
    console.log("Random_nums from")
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
                "url":`https://pokeapi.co/api/v2/pokemon/`,
                "type": "GET",
                "success": random_poke_list.push(`https://pokeapi.co/api/v2/pokemon/${random_poke_index[i]}`)
            }
        )

    }
    console.log("Random_nums succ")
    console.log(random_poke_list)
}


// function main_display() {
//     random_nums();
//     image = (picture['sprites']['other']['official-artwork']['front_default']);
//     $(".random_pokemon").html(`<img src=${image} width="100%"> `);


// }

function random_pokemon_f() {
    console.log("coming from random pokemon")
    random_nums()
    // 898 is max
    random_poke = Math.floor((Math.random() * 897) + 1); 

    $.ajax(
        {
            "url":`https://pokeapi.co/api/v2/pokemon/${random_poke}`,
            "type": "GET",
            "success": random_pokemon
        }
    )
    
}

function random_pokemon(picture) {
    console.log("Wrokgin from random_pokemon");
    console.log(picture);
    image = (picture['sprites']['other']['official-artwork']['front_default']);
    $(".random_pokemon").html(`<img src=${image} width="100%"> `);
    

}


function display(data) {
    console.log("display")
    console.log(data)
    picture = (data['sprites']['other']['official-artwork']['front_default']);
    $("#name").html(pokemon);
    $("#type").html(data['types'][0]['type']['name']);
    $("#picture").html(`<img src=${picture}>`);
    $("#abilities").html(JSON.stringify(data['abilities']))

}




function setup() {
    // main_display();
    random_pokemon_f();
    $('#get_pokemon').click(get_pokemon_f);

}

$(document).ready(setup)