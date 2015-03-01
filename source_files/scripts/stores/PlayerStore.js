var PlayerActions = require("<scripts>/actions/PlayerActions")

var PlayerStore = Reflux.createStore({
    data: {
        x: 2,
        y: 2,
        speed: 4
    },
    getData: function() {
        return this.data
    },
    listenables: [
        PlayerActions
    ],
    onAddPlayer: function() {
        console.log("add a player")
    },
    onMovePlayerNorth: function(tick) {
        this.data.y -= this.data.speed * tick
        this.retrigger()
    },
    onMovePlayerSouth: function(tick) {
        this.data.y += this.data.speed * tick
        this.retrigger()
    },
    onMovePlayerWest: function(tick) {
        this.data.x -= this.data.speed * tick
        this.retrigger()
    },
    onMovePlayerEast: function(tick) {
        this.data.x += this.data.speed * tick
        this.retrigger()
    }
})

module.exports = PlayerStore
