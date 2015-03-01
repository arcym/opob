var WorldActions = require("<scripts>/actions/WorldActions")

var WorldStore = Reflux.createStore({
    data: {
        width: 40,
        height: 30,
        tiles: {
        }
    },
    getData: function() {
        return this.data
    },
    listenables: [
        WorldActions
    ],
    onLoadWorld: function(world) {
        this.data.width = world.width
        this.data.height = world.height
        var tiles = world.layers[0].data
        for(var x = 0; x < world.width; x++) {
            for(var y = 0; y < world.height; y++) {
                var tile = tiles[y * world.width + x]
                if(tile === 2) {
                    this.data.tiles[x + "x" + y] = {
                        x: x, y: y
                    }
                }
            }
        }
        this.retrigger()
    }
})

module.exports = WorldStore
