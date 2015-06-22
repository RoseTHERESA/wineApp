var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	db = require("./models"),
	morgan = require("morgan");

app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('tiny'));

/****************** Wine Routes *******************/

//Root Directory
app.get('/', function(req,res){
	res.render("layout");
});

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
      //res.send({puppies: puppies}); //changed this to res.send, now it just returns the json of the page
    }); //its saying send that object as the data
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
	var wine = new db.Wine(req.body.wine);
	wine.ownerId = req.session.id
	wine.save(function(err,wine){
		res.format({
			'text/html': function(){
				res.redirect("/wines");
			},
			'application/json': function(){
				res.send(wine);
			},
			'default': function(){
				res.status(406).send('Not Acceptable');
			}
		});
	});
});





/************** Without Single Page App *************/
// 	db.Wine.create({varietal: req.body.varietal, vintage: req.body.vintage, winery: req.body.winery}, function(err, wine){
// 		if(err){
// 			console.log(err);
// 			res.render("wines/new");
// 		} else{
// 			console.log(wine);
// 			res.redirect("/wines");
// 		}
// 	});
// });

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
				res.redirect("/wines");
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
				res.redirect("/wines");
			}
	});
});


app.get('*', function(req,res){
	res.render('404');
});

app.listen(3000, function(){
	"Server is listening on port 3000"
});