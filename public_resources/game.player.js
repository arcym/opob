var Player = function(idnum, data) //data = {alias, role, color, x, y}
{
	this.idnum = data.idnum;
	this.alias = data.alias;
	this.role = data.role;
	
	this.color = data.color;
	
	this.position = data.position;
	
	this.speed = SIZE_OF_TILE / 11;
	this.size = SIZE_OF_TILE * 0.75;
	this.halfsize = this.size / 2;
	
	this.get_gfx = function()
	{
		var gfx = {};
		
		gfx.x = this.position.x;
		gfx.y = this.position.y;
		
		gfx.width = this.size;
		gfx.height = this.size;
		
		gfx.strokeWidth = 3;
		gfx.strokeStyle = "#000";
		gfx.fillStyle = this.color;
		gfx.cornerRadius = 2;
		
		return gfx;
	}
	
	this.flashlight = new Flashlight(this, data.flashlight);
}

var Flashlight = function(player, data)
{
	this.color = player.color;
	this.position = player.position;
	this.target_position = {x: 0, y: 0};
	
	this.width = 50;
	this.length = SIZE_OF_TILE * 3;
	
	this.battery = 100;
	
	if(data && data.target_position)
	{
		this.target_position = data.target_position;
	}
	
	this.get_gfx = function()
	{
		var gfx = {};
		
		gfx.x = this.position.x;
		gfx.y = this.position.y;
		
		gfx.radius = this.length;
		
		var x1 = $("#screen").offset().left + this.position.x;
		var y1 = $("#screen").offset().top + this.position.y;
		var angle = Math.atan2(y1 - this.target_position.y, x1 - this.target_position.x) * 180 / Math.PI - 90;
		gfx.start = angle - (this.width / 2);
		gfx.end = angle + (this.width / 2);
		
		gfx.opacity = 0.5;
		gfx.fillStyle = this.color;
		
		gfx.mask = true;
			
		return gfx;
	}
}

//if(typeof(module) != "undefined") {module.exports = Player;}