db = require("./models")


db.Varietal.create({name:"Cabernet Sauvignon", notes:["earthy"]});



setTimeout(function() {
	db.closeConnection();
}, 10000);