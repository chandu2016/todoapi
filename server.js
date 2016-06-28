var express = require('express');
var app     = express();
var PORT    = process.env.PORT || 3000;

var todos   = [{
	"id":1,
	"description":"Meet mom for lunch",
	"completed": false,
},
{
	"id":2,
	"description": "Do home work",
	"completed": "false"
},
{
	"id":3,
	"description": "Do Assignment",
	"completed": true
}
];

app.get('/',function (req, res){
	res.send('Todo Api');
});

app.get('/todos', function(req, res){
	res.json(todos);
});

app.get('/todos/:id', function(req, res){

	var paramId = parseInt(req.params.id);
	var item;
	var status  = 0;
	todos.forEach(function(elm){
		if(elm.id === paramId){
			item = elm;
			status = 1;
		}
	});

	if(status == 1){
		res.json(item);
	}
	else{
		res.status(404).send();
	}
});

app.listen(PORT, function(){
	console.log('express listening on port '+PORT);
});