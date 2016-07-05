var express = require('express');
var _		= require('underscore');
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
	item        = _.findWhere(todos, {"id": paramId});


	if(item){
		res.json(item);
	}
	else{
		res.status(404).send();
	}
});

app.post('/todos', function(req, res){
	var body = req.body;
	body     = _.pick(body,'completed', 'description');

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send();
	}
	body.id  = todosNextId;
	body.description = body.description.trim();
	todosNextId++;
	todos.push(body);
	console.log('description'+body.description);

	res.json(body);
});

app.listen(PORT, function(){
	console.log('express listening on port '+PORT);
});