function authenticate() {
    username =  $("#username").val();
    password =  $("#password").val();
    console.log(username + password)
    //This works to only GET data
    // $.get(`/usershop`, (data) => {
    //     if (data[0].name == username){
    //         console.log("Success")
    //     }
    //     console.log((data[0].name));
    // })

    $.post('/authenticate', {
        name: username,
        pass: password
    })
}

// function add() {
//     $.post('/usershop/insert', {
//         name: "user"
//     }), (Data) => {
//         console.log(Data)
//     }
// }

function setup() {
    $("#login_submit").click(authenticate)

}

$(document).ready(setup)