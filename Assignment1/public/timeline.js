function loadtimeline () {
    $.ajax({
        "type":"get",
        "url":"http://localhost:16666/timeline/getall",
        "data": "",
        "success": 
            (r) => {
                console.log(r)
                text = '';
                for( i = 0 ; i < r.length; i++  ){
                    text += 
                        `
                        <div> ${r[i].time} - ${r[i].action}
                            <button class="likeButtons" id="${r[i]["_id"]}"> Like! </button> 
                        </div> 
                        `
                }
                $("#timeline").html(text)
            },
        "error": failure()
        })
}

function failure() {
    $("#timeline").html(`Nothing seems to be here`);

}

function setup() {
    // console.log("Working")
    loadtimeline()
}

$(document).ready(setup)