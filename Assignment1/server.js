const express = require('express')
const app = express()
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use("./public", express.static("./public"));


app.listen(process.env.PORT || 16666, function (err) {
    if (err)
        console.log(err);
})

const https = require('https');

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
    })


app.get('/profile/:id', function (req, res) {


    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`

    https.get(url, function (https_res) {

        data = '';
        https_res.on("data", function (chunk) {
            data += chunk

        })
        
        https_res.on('end', function () {
            // console.log(JSON.stringify(JSON.parse(data)))
            data = (JSON.parse(data));
            // hp_ =  data.stats.filter((obj_)=>{
            //     return obj_.stat.name == "hp"
            // }).map( (obj_2)=> {
            //     return obj_2.base_stat
            // })

            stats = []
            for (i=0; i != data.stats.length; i++) {
                statname = data.stats[i].stat.name
                // stateffort = data.stats[i].effort
                basestats = data.stats[i].base_stat

                stats.push(statname + ": " + basestats)
            }

            bar = []
            for (i=0; i != data.stats.length; i++) {
                // statname = data.stats[i].stat.name
                // stateffort = data.stats[i].effort
                basestats = data.stats[i].base_stat

                bar.push(basestats)
            }

            skills = []
            for (i=0; i != data.abilities.length; i++) {
                skills.push(data.abilities[i].ability.name)
            }

            types = []
            for (i=0; i != data.types.length; i++) {
                types.push(data.types[i].type.name)
            }

            res.render("profile.ejs", {
                "id": req.params.id,
                "name": data.name,
                "img_path": data.sprites.other["official-artwork"]["front_default"],
                "stats": stats,
                "bar": bar,
                "height":  "Height: " + data.height,
                "weight": "Weight: " + data.weight,
                "skills": skills,
                "types": types,


            });
        })
    })


})
