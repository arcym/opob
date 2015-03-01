var PlayerActions = require("<scripts>/actions/PlayerActions")

var PlayerStore = Reflux.createStore({
    data: new Object(),
    getData: function() {
        return this.data
    },
    listenables: [
        PlayerActions
    ],
    onAddPlayer: function() {
        console.log("add player")
    },
    onMovePlayerNorth: function() {
        console.log("move player north")
    },
    onMovePlayerSouth: function() {
        console.log("move player south")
    },
    onMovePlayerWest: function() {
        console.log("move player west")
    },
    onMovePlayerEast: function() {
        console.log("move player east")
    }
})

module.exports = PlayerStore
