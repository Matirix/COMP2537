function loadtimeline () {
    $.ajax({
        type:"get",
        url:"https://young-tor-70220.herokuapp.com/timeline/getall",
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