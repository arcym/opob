/*Javascript Realtime Keyboard Input*/

var jrtkbi = new function()
{
	this.pressed = new Object();
	this.binded = new Object();
	
	this.is_pressed = function(keyCode)
	{
		keyCode = this.decode(keyCode);
		return this.pressed[keyCode];
	};
	
	this.is_binded = function(keyCode)
	{
		keyCode = this.decode(keyCode);
		return this.binded[keyCode];
	};
	
	this.bind = function(keyCode, callBack)
	{
		keyCode = this.decode(keyCode);
		this.binded[keyCode] = callBack;
	};
	
	this.keyStrings = new Object();
	this.keyStrings["up arrow"] = 38;
	this.keyStrings["left arrow"] = 37;
	this.keyStrings["down arrow"] = 40;
	this.keyStrings["right arrow"] = 39;
	this.keyStrings["space bar"] = 32;
	this.keyStrings["w"] = 87;
	this.keyStrings["a"] = 65;
	this.keyStrings["s"] = 83;
	this.keyStrings["d"] = 68;
	
	this.decode = function(keyCode)
	{
		if(isNaN(keyCode) && this.keyStrings[keyCode])
		{
			keyCode = this.keyStrings[keyCode];
		}
		
		return keyCode;
	}
	
	this.on = this.bind;
}

$(this).keydown(function(event)
{
	var keyCode = event.keyCode;
	
	/*if(jrtkbi.is_binded(keyCode))
	{
		event.preventDefault();
	}*/
	
	if(!jrtkbi.is_pressed(keyCode))
	{
		jrtkbi.pressed[keyCode] = true;
		if(jrtkbi.is_binded(keyCode))
		{
			jrtkbi.binded[keyCode]();
		}
	}
});

$(this).keyup(function(event)
{
	var keyCode = event.keyCode;
	delete jrtkbi.pressed[keyCode];
});

setInterval(function()
{
	for(var keyCode in jrtkbi.binded)
	{
		if(jrtkbi.is_pressed(keyCode))
		{
			jrtkbi.binded[keyCode]();
		}
	}
}, 25);