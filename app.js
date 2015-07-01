var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	db = require("./models"),
	morgan = require("morgan"),
	request = require("request"),
	session = require("cookie-session"),
	loginMiddleware = require("./middleware/loginHelper"),
	routeMiddleware = require("./middleware/routeHelper");

var dotenv = require("dotenv").load();		

app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('tiny'));

app.use(session({
	maxAge: 3600000,
	secret: "lovinthatwine",
	name: "vinobeatchip"
}));

app.use(loginMiddleware);

/****************** Wine Routes *******************/

//Root Directory
app.get("/", routeMiddleware.preventLoginSignup, function(req, res){
     res.render("users/login");
})

app.get("/signup", routeMiddleware.preventLoginSignup, function(req, res){
	res.render("users/signup");
});

app.post("/signup", function (req, res){
	var newUser = req.body.user;
	db.User.create(newUser, function (err, user){
		if (user) {
			req.login(user);
			res.redirect("/vinobeats");
		} else {
			console.log(err);
			res.render("users/signup")
		}
	});
});

app.post("/login", function (req, res){
	db.User.authenticate(req.body.user,
		function (err, user) {
			if (!err && user !== null) {
				req.login(user);
				res.redirect("/vinobeats");
			} else {
				res.render("users/login");
			}
		});
});

app.get("/vinobeats", routeMiddleware.ensureLoggedIn, function(req,res){
	res.render("layout");
})

app.get("/logout", function (req, res){
	req.logout();
	res.redirect("/")
});

/**************** Search Music *******************/

app.get("/searchMusic", function(req,res){
	var varietal = req.query.varietal
	db.Varietal.find({name: varietal}, function(error, varietals){
		var url = "http://api.soundcloud.com/tracks.json?client_id="+ process.env.SOUNDCLOUD_SECRET +"&limit=50&q="+ req.query.genre;

		if (!error && varietals.length && varietals.length > 0 && varietals[0].notes) {
			url += "+" + varietals[0].notes[0];

		}
		console.log(varietals);
		console.log(url);
		request.get(url, function(error, response, body){
			if(error){
				console.log(error)
			} else{
				var musicData = JSON.parse(body)
				var musicArray = []
				musicData.forEach(function(music){
					musicArray.push(music.uri);
				});
				var randomNumber = Math.floor(Math.random() * musicData.length)
				var randomTrack = musicArray[randomNumber]

			res.format({ //more complex, so it sees what request is coming in and gives it back
	      'text/html': function(){
	        res.render("searchMusic", {randomSong:musicArray[randomNumber]});	
	        },

	      'application/json': function(){
	        res.send(JSON.stringify(randomTrack));
	      },
	      'default': function() {
	        // log the request and respond with 406
	        res.status(406).send('Not Acceptable');
	    	}
		});
		}	

	});
	});

	
});


/***************** Search Wines ********************/

//Before Single Page Awesomeness...

app.get("/searchWines", function(req, res){
	var url = encodeURI("http://services.wine.com/api/beta2/service.svc/json/catalog?search="+req.query.winery+"+"+req.query.vintage+"&size=50&apikey=a16ee38c0befcddba3b69ff693aa5ece")
	// console.log(url);
	if(req.query.winery) {
	request.get(url,
		function(error, response, body){
			if(error){
				console.log(error)
			} else{
				var wineData = JSON.parse(body).Products.List;
				if(wineData[0] == undefined){
					console.log(wineData, "Looking at This")
					res.render("searchWines", {wineData: "no results"})
				} else {
					res.format({
					  'text/html': function(){
				  		res.render("searchWines", {wineData:wineData});	
	        	},
	        	'application/json': function(){
				  		res.send({wineData:wineData});
	      		},
	      		'default': function() {
	        		// log the request and respond with 406
	        		res.status(406).send('Not Acceptable');
	    			}
	    		});


				}
			}
	})
    } else {
     res.render("searchWines", {wineData: "Please Search"})
    }
})





//Index - Go to the index page and see all of the wines
	//Should this populate all the previous wines? Or should it be blank everytime and have a separate page for what the user already had?
app.get("/wines", function(req,res){
	db.Wine.find({},
		function(err, wines){
			console.log(wines)
		res.format({ //more complex, so it sees what request is coming in and gives it back
      'text/html': function(){
        res.render("wines/index", {wines: wines});
        },

      'application/json': function(){
        res.send({ wines: wines});
      },
      'default': function() {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable');
      }
      });
      
    }); 
});


/*************** Without Single Page App ******************/
// 			res.render("wines/index", {wines:wines});
// 	});
// });

//New
	//This should be a single page app!! 
app.get("/wines/new", function(req,res){
	res.render("wines/new")
});

//Create
	//This should also be a single page app!! 
	//After creating, it should only view the wines in this session
app.post("/wines", function(req,res){
	console.log("WE GOT HERE!")
	console.log(req.body.wine)
	var wine = new db.Wine(req.body.wine);
	wine.ownerId = req.session.id;
	//wine.ownerId = req.session.id
	wine.save(function(err,wine){
		console.log("ANY ERRORS?", err)
		res.format({
			'text/html': function(){
				res.redirect("/wines");
			},
			'application/json': function(){
				console.log("THIS IS WINE", wine)
				res.send(wine);
			},
			'default': function(){
				res.status(406).send('Not Acceptable');
			}
		});
	});
});


//Show
	//This will be used to show all of the previous wines enjoyed with the rating system
app.get("/wines/:id", function(req,res){
	db.Wine.findById(req.params.id,
		function (err, wine){
			res.render("wines/show", {wine:wine})
	});
});

//Edit
	//Only available to the current user
app.get("/wines/:id/edit", function(req,res){
	db.Wine.findById(req.params.id,
		function (err,wine){
			res.render("wines/edit", {wine:wine})
	});
});

//Update
	//only available to current users
app.put("/wines/:id", function(req,res){
	db.Wine.findByIdAndUpdate(req.params.id, {varietal: req.body.varietal, vintage: req.body.vintage, winery: req.body.winery},
		function (err, wine){
			if(err){
				res.render("wines/edit");
			} else{
				res.redirect("/vinobeats");
			}
	});
});

//DESTROY Delete
	//only available to current users
app.delete("/wines/:id", function(req,res){
	db.Wine.findById(req.params.id,
		function (err, wine){
			if(err){
				console.log(err);
				res.render("wines/show");
			} else{
				wine.remove();
				res.redirect("/vinobeats");
			}
	});
});



app.get('*', function(req,res){
	res.render('404');
});

app.listen(process.env.PORT || 3000, function(){
	"Server is listening on port 3000"
});