const express = require('express')
const bodyparser = require("body-parser");
const app = express()
var session = require('express-session')
app.set('view engine', 'ejs');
const path = require('path');
app.use(express.static('./public'));
//HASHING
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// app.use("./public", express.static("./public"));

const mongoose = require('mongoose');
//Session middleware
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
//Bodyparser
app.use(bodyparser.urlencoded({
    extended: true
  }));

mongoose.connect("mongodb+srv://Matirix:ThZ66IU29TT6Vb39@cluster0.wg0oi.mongodb.net/pokemonDB?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(process.env.PORT || 16666, function (err) {
    if (err)
        console.log(err);
})

const https = require('https');
const { response } = require('express');

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
    })



//Login
const userSchema = new mongoose.Schema({
    username: String,
    pass: String,
    pokuisine: [Object],
    order_history: Array,
    
});

const userModel = mongoose.model("userlists", userSchema);




// Start of Pokemon-Timeline Data
const timelineSchema = new mongoose.Schema({
    username: String,
    action: String,
    likes: Number,
    time: String
});

const timelineModel = mongoose.model("timelines", timelineSchema);
var htmlPath = path.join(__dirname, 'public');

//SIGN UP
app.post('/signup', async function (req, res){
    const salt = await bcrypt.genSalt(10)
    const hashedpass = await bcrypt.hash(req.body.pass, salt)
    valid =  await checkindb(req.body.name)
    if (!valid) {
        userModel.create({
            username: req.body.name,
            pass: hashedpass,
        }, (err, data) => {
            if (err) {
                throw err;
            } 
            req.session.authenticated = true;
            req.session.user = data.username;
            res.redirect('/pokuisine')
        })
    } else {
        res.send("fail")
    }

})

//DECRYPT
function decrypt(name, password) {
    userModel.find({username: name}).then(
        (result) => {
        bcrypt.compare(password, result[0].pass).then(
            //Is it true?
            (data) => console.log(data)
        )}
    )

}

//LOGIN
app.post('/authenticate', async function (req, res){
        try {
            if (decrypt(req.body.name, req.body.pass))
            req.session.authenticated = true
            req.session.user = req.body.name
            res.redirect('/pokuisine')
        } catch (err) {
            res.send('fail')
        }
    }
)  


//LOGIN FAIL
app.get('/loginfailed', function(req, res){
    console.log("FAILED")
    res.sendFile(path.join(htmlPath + "/login.html"))
})
 



async function checkindb (name) {
    //Assigns function and it's result to a variable 
    const exists = await userModel.find({username: name})
    return (exists.length > 0)
}

// NAME DISPLAYED IN SHOPPING.HTML
app.get('/guest', function (req, res) {
    // console.log(req.session.user)
    if (req.session.user) {
        res.send(req.session.user)
    }
    else {
        res.redirect('../login.html')
    }
})

//REDIRECTING USER IF NOT LOGGED IN - TIMELINE
app.get('/pokuisine', function (req, res) {
    // console.log(req.session.user)
    if (req.session.user) {
        res.sendFile(path.join(htmlPath + "/shopping.html"))
    }
    else {
        res.redirect('/login.html')
    }
})

// REDIRECTING IF USER NOT LOGGED IN - TIMELINE
app.get('/history', function (req, res) {
    // console.log(req.session.user)
    if (req.session.user) {
        res.sendFile(path.join(htmlPath + "/timeline.html"))
    }
    else {
        res.redirect('/login.html')
    }
})
// PROFILE
app.get('/userprofile', function (req, res) {
    // console.log(req.session.user)
    if (req.session.user) {
        res.sendFile(path.join(htmlPath + "/profile.html"))
    }
    else {
        res.redirect('/login.html')
    }
})


//LOGIN SHOPLIST
app.get('/shoplist', function(req, res) {
    // console.log("from Shoplist route" + req.session.user)
    //Username to be replaced with req.session.user
    userModel.find(
        {username: req.session.user},
    function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data from shoplist");
        }
        res.send(data);
    });
})
//LOGOUT
app.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        res.send("You aren now logged out");
    } else {
        res.send("You're not logged in!")
    }
})
//ADD
app.post('/addtolist', function (req, res) {
    //username will have to be by user sesssion
    var pokemon = {pID: req.body.pokeID, weight: req.body.pokeWeight , quantity: 1, img: req.body.img}
    if (req.session.user) {
        userModel.findOneAndUpdate(
            {username: req.session.user},
            {$push: {pokuisine: pokemon}},
            (error, success) => console.log(success))
        res.send("Successfully Added!")
    } else {
        res.send("Error, user not logged in")
    }}
);
//DELETE
app.post('/delete_item', function (req, res) {
    userModel.updateOne(
        {username: req.session.user},
        {$pull: {
            "pokuisine": {pID: req.body.pokemonID}
        }} 
    , (err, data) => console.log("Sucessfully deleted " + data))
})

app.post('/emptyshoplist', function (req, res) {
    userModel.updateMany(
        {username: req.session.user},
        {$set:
        {
            "pokuisine": {}
        }}
    ).then(
        (err, data) =>  
        res.redirect('/')) 
        
    
})
// Timeline Get all
app.get('/timeline/getAll', function(req, res) {

    if (!req.session.user) return res.send("fail")

    timelineModel.find({
        'username': req.session.user
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data);
    });
})

//Insertions
app.post('/timeline/insert', function (req, res) {
    console.log(req.body)
    if (!req.session.user) return res.send("User not logged in")

    timelineModel.create({
        'username': req.session.user,
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


app.get('/profile/:id', function (req, res) {
    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    https.get(url, function (https_res) {

        data = '';
        https_res.on("data", function (chunk) {
            data += chunk

        })
        
        https_res.on('end', function () {
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
                "height": data.height,
                "weight": data.weight,
                "skills": skills,
                "types": types,


            });
        })
    })


})
