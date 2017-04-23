//Loading External Modules
var express = require('express');

//Defining on which port server need to listen
var port = process.env.PORT || 3000;

//Instantiating server
var app = express();

//Configurations or using modules
app.use(express.static(__dirname+'/public/'));



app.listen(port, function() {

	console.log("Server is listening at: ", port);
});

