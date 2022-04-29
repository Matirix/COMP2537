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

function display(data) {
    console.log("display")
    console.log(data)
    picture = (data['sprites']['other']['official-artwork']);
    // $("#display").html(`<img src=${picture}>` );
    $("#display").html(picture);


    
}




function setup() {
    $('#get_pokemon').click(get_pokemon_f);

}

$(document).ready(setup)