function loadtimeline () {
    $.ajax({
        type:"get",
        url:"http://localhost:16666/timeline/getall",
        data: "",
        success: 
            (r) => {
                console.log(r)
                for( i = 0 ; i < r.length; i++  ){
                    $("#timeline").append(`
                        <div> ${r[i].time} - ${r[i].action}
                            <button class="likeButtons" id="${r[i]["_id"]}"> Like! </button> 
                        </div> 
                        `)         
                }
               
            }
        })
    }
function setup() {
    // console.log("Working")
    loadtimeline()
}

$(document).ready(setup)