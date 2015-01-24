var application = require("express")();
var server = require("http").createServer(application);
var io = require("socket.io").listen(server, {log: false});

var __srcdirname = __dirname + "/public_resources";
application.use(require("express").static(__srcdirname));

application.get("/", function (request, response)
{
	response.sendfile(__srcdirname + "/game.html");
});

var port = 1271;
server.listen(port);


var players = new function()
{
	this._players = new Object();
	
	this.get = function(idnum) {return this._players[idnum];}
	this.add = function(idnum, player) {this._players[idnum] = player;}
	this.drop = function(idnum) {delete this._players[idnum];}
}

io.sockets.on("connection", function (socket)
{
	for(var idnum in players._players)
	{
		var player = players.get(idnum);
		socket.emit("added a player", idnum, player);
	}
	
	socket.on("added a player", function(idnum, data)
	{
		socket.broadcast.emit("added a player", idnum, data);
		
		players.add(idnum, data);
		console.log(players._players);
		
		socket.set("idnum", idnum);
	});
	
	socket.on("updated a player", function(idnum, data)
	{
		socket.broadcast.emit("updated a player", idnum, data);
		
		function copy_attributes(first, second)
		{
			for(var attribute in second)
			{
				if(typeof(second[attribute] != "object"))
				{
					first[attribute] = second[attribute];
				}
				else
				{
					copy_attributes(first[attribute], second[attribute]);
				}
			}
		}
		
		var player = players.get(idnum);
		
		if(player)
		{
			if(data.position)
			{
				if(data.position.x)
				{
					player.position.x = data.position.x;
				}
				
				if(data.position.y)
				{
					player.position.y = data.position.y;
				}
			}
			
			if(data.flashlight)
			{
				if(data.flashlight.target_position)
				{
					player.flashlight.target_position = data.flashlight.target_position;
				}
			}
			
			if(data.role)
			{
				player.role = data.role;
			}
		}
	});
	
	socket.on("deleted a player", function(idnum)
	{
		socket.broadcast.emit("deleted a player", idnum);
		players.drop(idnum);
		console.log(players._players);
	});
	
	socket.on("disconnect", function()
	{
		socket.get("idnum", function(error, idnum)
		{
			if(!error)
			{
				socket.broadcast.emit("deleted a player", idnum);
				players.drop(idnum);
				console.log(players._players);
			}
		});
	});
});