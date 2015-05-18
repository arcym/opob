var PlayerActions = require("<scripts>/actions/PlayerActions")
var WorldStore = require("<scripts>/stores/WorldStore")
var GruntActions = require("<scripts>/actions/GruntActions")

var PlayerStore = Reflux.createStore({
    data: new Object(),
    getData: function() {
        return this.data
    },
    listenables: [
        PlayerActions
    ],
    onAddPlayer: function(name) {
        this.data = {
            x: 2, y: 2,
            speed: 3,
            type: "grunt",
            name: name
        }
        GruntActions.AddGrunt(this.data)
        this.retrigger()
    },
    onRemovePlayer: function() {
        GruntActions.RemoveGrunt(this.name)
        this.data = new Object()
        this.retrigger()
    },
    onMovePlayerNorth: function(tick) {
        var x = Math.floor(this.data.x)
        var y = Math.floor(this.data.y - this.data.speed * tick)
        if(WorldStore.getData().tiles[x + "x" + y] == undefined) {
            this.data.y -= this.data.speed * tick
            GruntActions.UpdateGrunt(this.data)
            this.retrigger()
        }
    },
    onMovePlayerSouth: function(tick) {
        var x = Math.floor(this.data.x)
        var y = Math.floor(this.data.y + this.data.speed * tick)
        if(WorldStore.getData().tiles[x + "x" + y] == undefined) {
            this.data.y += this.data.speed * tick
            GruntActions.UpdateGrunt(this.data)
            this.retrigger()
        }
    },
    onMovePlayerWest: function(tick) {
        var x = Math.floor(this.data.x - this.data.speed * tick)
        var y = Math.floor(this.data.y)
        if(WorldStore.getData().tiles[x + "x" + y] == undefined) {
            this.data.x -= this.data.speed * tick
            GruntActions.UpdateGrunt(this.data)
            this.retrigger()
        }
    },
    onMovePlayerEast: function(tick) {
        var x = Math.floor(this.data.x + this.data.speed * tick)
        var y = Math.floor(this.data.y)
        if(WorldStore.getData().tiles[x + "x" + y] == undefined) {
            this.data.x += this.data.speed * tick
            GruntActions.UpdateGrunt(this.data)
            this.retrigger()
        }
    }
})

module.exports = PlayerStore
