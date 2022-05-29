function getallusers() {
    $("#accountslist").empty()
    $.get('/getalluser').then(
        (data) => {
            data.forEach(displayusers)
        }
    )
}

function displayusers(user, index, arr) {
    let accounts = '';
    accounts += `
    <br>
    Name: ${user.username} ||
    Account type: ${user.type} ||
    <button id="${user.username}" onclick="deleteUser(this.id)" class="selectuser">Delete</button>
    <button id="${user.username}" onclick="makeAdmin(this.id)" class="selectuser">Make Admin!</button>`

    $("#accountslist").append(accounts)
}

function deleteUser(uName) {
    console.log(uName)
    $.post('/deleteuser', {
        userName: uName,
    }).then(
        data => alert(data)
    )
}

function makeAdmin(uName) {
    console.log(uName)
    $.post('/makeadmin', {
        userName: uName,
    }).then(
        data => alert(data)
    )
}

function setup() {
    getallusers();
}

$(document).ready(setup)