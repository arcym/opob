var WorldActions = require("<scripts>/actions/WorldActions")

var WorldStore = Reflux.createStore({
    data: {
        width: 40,
        height: 30,
        tiles: {
            "1x1": {
                x: 1,
                y: 1
            },
            "2x1": {
                x: 2,
                y: 1
            }
        }
    },
    getData: function() {
        return this.data
    },
    listenables: [
        WorldActions
    ],
    onLoadWorld: function() {
        console.log("load a world")
    }
})

module.exports = WorldStore
