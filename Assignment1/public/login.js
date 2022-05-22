function authenticate() {
    username =  $("#username").val();
    password =  $("#password").val();


    $.post('/authenticate', {
        name: username,
        pass: password
    }).then(
        data => {
            if (data !== 'fail') {
                $('body').replaceWith(data)
            }
            else {
                console.log("Faild to login")
                alert("Login not successful")
            }
        } 
        )

}

function greeting() {
    console.log("greeting")
    $.get('/guest', (data) => $("#guest").html(data))
}
    
function logout() {
    $.get('/logout', (data) => alert(data))
}

function signup(){
    username =  $("#username").val();
    password =  $("#password").val();
    console.log(username + password)


    $.post('/signup', {
        name: username,
        pass: password
    }).then(
        (data) => {
            if (data == "fail") {
                console.log(data)
                alert("username is taken")
            } else {
                console.log("success")
                $('body').replaceWith(data)
            }
        }
    )
}


function setup() {
    $("#login_submit").click(authenticate)
    $("#signup_submit").click(signup)
    greeting();
    
    

}

$(document).ready(setup)