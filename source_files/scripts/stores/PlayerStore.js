var PlayerActions = require("<scripts>/actions/PlayerActions")
var WorldStore = require("<scripts>/stores/WorldStore")
var GruntActions = require("<scripts>/actions/GruntActions")

var PlayerStore = Reflux.createStore({
    data: {
        x: 2,
        y: 2,
        speed: 4,
        type: "grunt",
        name: "andrew"
    },
    getData: function() {
        return this.data
    },
    listenables: [
        PlayerActions
    ],
    onAddPlayer: function(name) {
        GruntActions.AddGrunt(name)
    },
    onRemovePlayer: function(name) {
        GruntActions.RemoveGrunt(name)
    },
    onMovePlayerNorth: function(tick) {
        var x = Math.floor(this.data.x)
        var y = Math.floor(this.data.y - this.data.speed * tick)
        if(WorldStore.getData().tiles[x + "x" + y] == undefined) {
            this.data.y -= this.data.speed * tick
            this.retrigger()
        }
    },
    onMovePlayerSouth: function(tick) {
        var x = Math.floor(this.data.x)
        var y = Math.floor(this.data.y + this.data.speed * tick)
        if(WorldStore.getData().tiles[x + "x" + y] == undefined) {
            this.data.y += this.data.speed * tick
            this.retrigger()
        }
    },
    onMovePlayerWest: function(tick) {
        var x = Math.floor(this.data.x - this.data.speed * tick)
        var y = Math.floor(this.data.y)
        if(WorldStore.getData().tiles[x + "x" + y] == undefined) {
            this.data.x -= this.data.speed * tick
            this.retrigger()
        }
    },
    onMovePlayerEast: function(tick) {
        var x = Math.floor(this.data.x + this.data.speed * tick)
        var y = Math.floor(this.data.y)
        if(WorldStore.getData().tiles[x + "x" + y] == undefined) {
            this.data.x += this.data.speed * tick
            this.retrigger()
        }
        this.retrigger()
    }
})

module.exports = PlayerStore
