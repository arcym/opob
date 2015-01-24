var Tile = function(x, y, t)
{
	this.position = {x: x, y: y};
	
	if(t == "1")
	{
		this.unpassable = true;
	}
	
	this.get_gfx = function()
	{
		var gfx = {};
		
		gfx.fromCenter = false;
		
		gfx.x = this.position.x * SIZE_OF_TILE;
		gfx.y = this.position.y * SIZE_OF_TILE;
		
		gfx.width = SIZE_OF_TILE;
		gfx.height = SIZE_OF_TILE;
		
		if(this.unpassable) {gfx.fillStyle = "#000";}
		else {gfx.fillStyle = "RGBA(85, 85, 85, 0.5)";}
		
		return gfx;
	}
}

var Room = function(tiles, width, height)
{
	this.width = width;
	this.height = height;
	
	this.tiles = new Array();
	for(var y = 0; y < this.height; y++)
	{
		for(var x = 0; x < this.width; x++)
		{
			var t = tiles[x + y * this.width];
			var tile = new Tile(x, y, t);
			this.tiles.push(tile);
		}
	}
	
	this.tile = function(x, y)
	{
		return this.tiles[x + y * this.width];
	}
};

//if(typeof(module) != "undefined") {module.exports = Room;}