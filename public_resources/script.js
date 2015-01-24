////////////////////////////////
//Establishing some Constants//
//////////////////////////////

var SIZE_OF_TILE = 22;

var room = new Room("11111111111111111111111111" + "10000000101000001000000001" + "10100000001000001011110111" + "10111000101000001000000001" + "10001000100000000010111101" + "10101101101110111010000101" + "10100000000000000010000001" + "10101111100000000011111101" + "10001000100000000000000001" + "10111101101110111011111101" + "10100000001000001000000101" + "10100000101000001000000101" + "10111101101110111000000001" + "10000000100000001000000101" + "11111111111111111111111111", 26, 15);

var players = new function()
{
	this._players = new Object();
	
	this.get = function(idnum) {return this._players[idnum];}
	this.add = function(idnum, player) {this._players[idnum] = player;}
	this.drop = function(idnum) {delete this._players[idnum];}
}

var me;
var colors = ["yellow", "red", "green", "blue", "magenta", "cyan"];

////////////////////////////
//Configuring the Network//
//////////////////////////

var socket = io.connect(ipaddr + ":1271");

socket.on("added a player", function(idnum, data)
{
	var player = new Player(idnum, data);
	players.add(idnum, player);
	
	console.log(players._players);
});

socket.on("updated a player", function(idnum, data)
{
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
			
			check_for_collision_between_it_and_me();
			check_for_if_it_is_near_me();
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
	players.drop(idnum);
	
	if(idnum == me.idnum)
	{
		me = undefined;
		
		message = "CAPTURED!"
		setTimeout(function()
		{
			message = "";
		}, 2500)
	}
	
	console.log(players._players);
});

/////////////////////////////
//Configuring the Keyboard//
///////////////////////////

jrtkbi.on("d", function()
{
	if(me)
	{
		var x = Math.floor((me.position.x + me.speed) / SIZE_OF_TILE);
		var y = Math.floor(me.position.y / SIZE_OF_TILE);
		var tile = room.tile(x, y);
		
		if(!tile.unpassable)
		{
			me.position.x += me.speed;
			
			socket.emit("updated a player", me.idnum, {position: me.position});
		}
		
		check_for_collision_between_it_and_me();
		check_for_if_it_is_near_me();
	}
});

jrtkbi.on("a", function()
{
	if(me)
	{
		var x = Math.floor((me.position.x - me.speed) / SIZE_OF_TILE);
		var y = Math.floor(me.position.y / SIZE_OF_TILE);
		var tile = room.tile(x, y);
		
		if(!tile.unpassable)
		{
			me.position.x -= me.speed;
			
			socket.emit("updated a player", me.idnum, {position: me.position});
		}
		
		check_for_collision_between_it_and_me();
		check_for_if_it_is_near_me();
	}
});

jrtkbi.on("s", function()
{
	if(me)
	{
		var x = Math.floor(me.position.x / SIZE_OF_TILE);
		var y = Math.floor((me.position.y + me.speed) / SIZE_OF_TILE);
		var tile = room.tile(x, y);
		
		if(!tile.unpassable)
		{
			me.position.y += me.speed;
			
			socket.emit("updated a player", me.idnum, {position: me.position});
		}
		
		check_for_collision_between_it_and_me();
		check_for_if_it_is_near_me();
	}
});

jrtkbi.on("w", function()
{
	if(me)
	{
		var x = Math.floor(me.position.x / SIZE_OF_TILE);
		var y = Math.floor((me.position.y - me.speed) / SIZE_OF_TILE);
		var tile = room.tile(x, y);
		
		if(!tile.unpassable)
		{
			me.position.y -= me.speed;
			
			socket.emit("updated a player", me.idnum, {position: me.position});
		}
		
		check_for_collision_between_it_and_me();
		check_for_if_it_is_near_me();
	}
});

$(document).on("mousemove", function(event)
{
	if(me)
	{
		me.flashlight.target_position.x = event.clientX;
		me.flashlight.target_position.y = event.clientY;
		
		var data = {flashlight: {target_position: {x: event.clientX, y: event.clientY}}}
		socket.emit("updated a player", me.idnum, data);
	}
});

$(document).on("mousedown", function(event)
{
	if(me)
	{
		if(me.role == "it")
		{
			me.taunting = true;
			socket.emit("taunting a player", me.idnum, true);
		}
		else if(me.role == "not it")
		{
			var it = find_which_player_is_it();
			if(it)
			{
				var playerX = $("#screen").offset().left + me.position.x;
				var playerY = $("#screen").offset().top + me.position.y;
				var angle2mouse = Math.atan2(playerY - event.clientY, playerX - event.clientX) * 180 / Math.PI;
				var angle2ninja = Math.atan2(me.position.y - it.position.y, me.position.x - it.position.x) * 180 / Math.PI;
				
				if(Math.abs(angle2mouse - angle2ninja) <= me.flashlight.width / 2)
				{
					var a = me.position.x - it.position.x;
					var b = me.position.x - it.position.x;
					var distance = Math.abs(Math.sqrt(a*a + b*b))
					if(distance < me.flashlight.length + 45)
					{
						console.log(it.idnum);
						socket.emit("deleted a player", it.idnum);
						players.drop(it.idnum);
						
						me.role = "it";
						socket.emit("updated a player", me.idnum, {role: "it"});
					}
				}
			}
		}
	}
});

$(document).on("mouseup", function(event)
{
	if(me)
	{
		if(me.role == "it")
		{
			me.taunting = false;
			socket.emit("taunting a player", me.idnum, false);
		}
	}
});

//////////////////////
/////////////////////
////////////////////

$(document).ready(function()
{
	$("canvas").attr("width", room.width * SIZE_OF_TILE);
	$("canvas").attr("height", room.height * SIZE_OF_TILE);
	$("canvas").parent().css("width", room.width * SIZE_OF_TILE);
	$("canvas").parent().css("height", room.height * SIZE_OF_TILE + 32);
	
	$("button").click(function(event)
	{
		if(!me)
		{
			$("#join").fadeIn();
			$("#join").find("[type=text]").focus();
		}
	});
	
	$("#join").submit(function(event)
	{
		var idnum = new String(new Date().getTime()).substring(9);
		var alias = $(this).find("[type=text]").val() || idnum;
		var color = colors[Math.floor(Math.random() * colors.length)];
		var role = find_which_player_is_it() ? "not it" : "it";
		if(role == "it") {color = "gray";}
		var x = ((room.width + 1) / 2) * SIZE_OF_TILE;
		var y = (room.height / 2) * SIZE_OF_TILE;
		
		var data = new Object();
		data.idnum = idnum;
		data.alias = alias;
		data.role = role;
		data.color = color;
		data.position = {x: x, y: y};
		data.flashlight = {target_position: {x: 0, y: 0}};
		
		me = new Player(idnum, data);
		players.add(idnum, me);
		
		socket.emit("added a player", idnum, data);
		
		$("#join").hide();
		event.preventDefault();
	});
	
	window.setInterval(update, 100);
	window.requestAnimationFrame(render);
});

function update()
{
	if(me)
	{
		me.flashlight.battery -= 0.02;
		
		if(me.flashlight.battery <= 0)
		{
			me.flashlight.battery = 0;
		}
	}
}

/////////////////////////
//Rendering the Output//
///////////////////////

var message;

function render()
{
	$("#screen").clearCanvas();
	
	for(var x = 0; x < room.width; x++)
	{
		for(var y = 0; y < room.height; y++)
		{
			$("#screen").drawRect(room.tile(x, y).get_gfx());
		}
	}
	
	var it = find_which_player_is_it();
	for(var idnum in players._players)
	{
		var player = players.get(idnum);
		
		if(player != it)
		{
			$("#screen").drawSlice(player.flashlight.get_gfx());
			if(it) {$("#screen").drawRect(it.get_gfx());}
			$("#screen").restoreCanvas();
			
			$("#battery").text(player.flashlight.battery.toFixed(2));
			
			$("#screen").drawRect(player.get_gfx());
		}
		else
		{
			if(me == it || !me)
			{
				$("#screen").drawRect(player.get_gfx());
			}
		}
	}
	
	if(message)
	{
		$("#screen").drawText({
			fillStyle: "orange",
			strokeStyle: "#000",
			strokeWidth: 2,
			fontSize: "64px",
			text: message,
			fontFamily: "goldfish",
			x: $("#screen").width() / 2,
			y: $("#screen").height() / 2,
		});
	}
	
	window.requestAnimationFrame(render);
}

//////////////////////
/////////////////////
////////////////////

function check_for_collision_between_it_and_me()
{
	var it = find_which_player_is_it();
	
	if(it && me)
	{
		if(it != me)
		{
			if(((it.position.x + it.halfsize > me.position.x - me.halfsize
			&& it.position.x + it.halfsize < me.position.x + me.halfsize)
			|| (it.position.x - it.halfsize > me.position.x - me.halfsize
			&& it.position.x - it.halfsize < me.position.x + me.halfsize))
			&& ((it.position.y + it.halfsize > me.position.y - me.halfsize
			&& it.position.y + it.halfsize < me.position.y + me.halfsize)
			|| (it.position.y - it.halfsize > me.position.y - me.halfsize
			&& it.position.y - it.halfsize < me.position.y + me.halfsize)))
			{
				socket.emit("deleted a player", me.idnum);
				players.drop(me.idnum);
				me = undefined;
				
				message = "ASSASINATED!"
				setTimeout(function()
				{
					message = "";
				}, 2500)
			}
		}
	}
}

function check_for_if_it_is_near_me()
{
	var it = find_which_player_is_it();
	
	if(it && me)
	{
		if(it != me)
		{
			if(Math.abs(it.position.x - me.position.x) < SIZE_OF_TILE * 2
			&& Math.abs(it.position.y - me.position.y) < SIZE_OF_TILE * 2)
			{
				//$("#screen").effect("shake", {distance: 2}, 100);
			}
		}
	}
}

function find_which_player_is_it()
{
	for(var idnum in players._players)
	{
		var player = players.get(idnum);
		
		if(player.role == "it")
		{
			return player;
		}
	}
}

function game_over()
{
	window.location = window.location;
}