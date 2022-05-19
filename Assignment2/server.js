const express = require('express')
const app = express()
var cors = require('cors')
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use("./public", express.static("./public"));
app.use(cors())

const mongoose = require('mongoose');


const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({
  extended: true
}));



// Pokemon Data
//Database
mongoose.connect("mongodb+srv://Matirix:ThZ66IU29TT6Vb39@cluster0.wg0oi.mongodb.net/pokemonDB?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true });
//collections
//For Pokemon names
const pokemonSchema = new mongoose.Schema({
    name: String,
    abilities: Array,
    weight: Number,
    height: Number,
    sprites: Object,
    id: Number,
    types: Array,
    stats: Object
});
const pokemonModel = mongoose.model("pokemons", pokemonSchema);


//Start of Pokemon Types

const pokemonTypeSchema = new mongoose.Schema({
    name: String,
});
const pokemonTypeModel = mongoose.model("types", pokemonTypeSchema);


//Pokemon Habitats
const pokemonHabitatSchema = new mongoose.Schema({
    name: String,
    id: Number,
});
const pokemonHabitatModel = mongoose.model("habitats", pokemonHabitatSchema);



// Start of Pokemon-Timeline Data
const timelineSchema = new mongoose.Schema({
    action: String,
    likes: Number,
    time: String
});
const timelineModel = mongoose.model("timelines", timelineSchema);
// End of Pokemon-Timeline Data



//Get All's
// Pokemon
app.get('/pokemon/getAll', function(req, res) {
    pokemonModel.find({}, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data);
    });
})


//Type
app.get('/type', function(req, res) {
    pokemonTypeModel.find({
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data);
    });
})

app.get('/pokemon-habitat/:id', function(req, res) {
    pokemonHabitatModel.find({
        name: req.params.id
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data);
    });
})


app.get('/ability/:id', function(req, res) {
    pokemonModel.find({
        id: req.params.id
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data);
    });
})


//Pokemon by ID
app.get('/pokemon/:id', function(req, res) {
    pokemonModel.find({
        // or: [
            id: req.params.id
            // name: req.params.id,
        // ]
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data);
    });
})


// Timeline
app.get('/timeline/getAll', function(req, res) {
    timelineModel.find({}, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data);
    });
})

//Insertions
//Pokemon

app.put('/timeline/insert', function (req, res) {
    console.log(req.body)
    timelineModel.create({
        'action': req.body.action,
        'time': req.body.time,
        'likes': req.body.likes
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data 2" + data);
        }
        res.send("Insertion is successful!");
    });
})


//Incremement

app.get('/timeline/inscreaseHits/:id', function (req, res) {
    // console.log(req.body)
    timelineModel.updateOne({
        '_id': req.params.id
    },{
        $inc: {'likes': 1}
    } ,function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data 1" + data);
        }
        res.send("Update request is successful!");
    });
})


// 
app.listen(process.env.PORT || 16666, function (err) {
    if (err)
        console.log(err);
})

const https = require('https');

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
})


app.get('/profile/:id', function (req, res) {
    data = '';
    pokemonModel.find({
        id: req.params.id
    }, function (err, chunk) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data");
        }
        data = chunk[0];
        // console.log(data)
        // console.log(data.types[0].type.name)
        // console.log(data.stats.length)
        // console.log(data.sprites)
        // console.log(data.sprites.other['official-artwork'].front_default)

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
            // image = (data[0]['sprites']['other']['official-artwork']['front_default'])
            "img_path": data.sprites.other['official-artwork'].front_default,
            "stats": stats,
            "bar": bar,
            "height":  "Height: " + data.height,
            "weight": "Weight: " + data.weight,
            "skills": skills,
            "types": types,


        });
    
    });
})


// app.get('/profile/:id', function (req, res) {

//     const url = `https://localhost:16666/pokemon/${req.params.id}`
//     // const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`


//     https.get(url, function (https_res) {

//         data = '';
//         https_res.on("data", function (chunk) {
//             data += chunk

//         })
        
//         https_res.on('end', function () {

//             data = (JSON.parse(data));

//             stats = []
//             for (i=0; i != data.stats.length; i++) {
//                 statname = data.stats[i].stat.name
//                 // stateffort = data.stats[i].effort
//                 basestats = data.stats[i].base_stat

//                 stats.push(statname + ": " + basestats)
//             }

//             bar = []
//             for (i=0; i != data.stats.length; i++) {
//                 // statname = data.stats[i].stat.name
//                 // stateffort = data.stats[i].effort
//                 basestats = data.stats[i].base_stat

//                 bar.push(basestats)
//             }

//             skills = []
//             for (i=0; i != data.abilities.length; i++) {
//                 skills.push(data.abilities[i].ability.name)
//             }

//             types = []
//             for (i=0; i != data.types.length; i++) {
//                 types.push(data.types[i].type.name)
//             }

//             res.render("profile.ejs", {
//                 "id": req.params.id,
//                 "name": data.name,
//                 "img_path": data.sprites.other["official-artwork"]["front_default"],
//                 "stats": stats,
//                 "bar": bar,
//                 "height":  "Height: " + data.height,
//                 "weight": "Weight: " + data.weight,
//                 "skills": skills,
//                 "types": types,


//             });
//         })
//     })


// })
