function authenticate() {
    username =  $("#username").val();
    password =  $("#password").val();
    console.log(username + password)


    $.post('/authenticate', {
        name: username,
        pass: password
    }).then(
        data => {
            if (data !== 'fail') {
                $('body').replaceWith(data)
            }
            else {
                alert("Login not successful")
            }
        } 
        )

}
    
function logout() {
    $.get('/logout', (data) => alert(data))
}



function setup() {
    $("#login_submit").click(authenticate)
    

}

$(document).ready(setup)