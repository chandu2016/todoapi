var express = require('express');
var app     = express();
var PORT    = process.env.PORT || 3000;
var bodyParser = require('body-parser');

var todos   = [];
var todosNextId = 1;

app.use(bodyParser.json());

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

app.post('/todos', function(req, res){
	var body = req.body;
	body.id  = todosNextId;
	todosNextId++;
	todos.push(body);
	console.log('description'+body.description);

	res.json(body);
});

app.listen(PORT, function(){
	console.log('express listening on port '+PORT);
});