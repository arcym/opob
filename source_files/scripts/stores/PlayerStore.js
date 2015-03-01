var PlayerActions = require("<scripts>/actions/PlayerActions")

var PlayerStore = Reflux.createStore({
    data: {
        x: 1,
        y: 1,
        speed: 4
    },
    getData: function() {
        return this.data
    },
    listenables: [
        PlayerActions
    ],
    onAddPlayer: function() {
        console.log("add player")
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
