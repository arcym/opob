var LoopStore = require("<scripts>/stores/LoopStore")
var InputBindingStore = require("<scripts>/stores/InputBindingStore")
var KeyboardInputStore = require("<scripts>/stores/KeyboardInputStore")

var PlayerStore = require("<scripts>/stores/PlayerStore")
var PlayerActions = require("<scripts>/actions/PlayerActions")

var Grunt = require("<scripts>/components/Grunt")

var PlaythroughScreen = React.createClass({
    mixins: [
        Reflux.connect(PlayerStore, "player")
    ],
    componentDidMount: function() {
        InputBindingStore.addAction("w", PlayerActions.MovePlayerNorth)
        InputBindingStore.addAction("s", PlayerActions.MovePlayerSouth)
        InputBindingStore.addAction("a", PlayerActions.MovePlayerWest)
        InputBindingStore.addAction("d", PlayerActions.MovePlayerEast)
        InputBindingStore.addAction("up arrow", PlayerActions.MovePlayerNorth)
        InputBindingStore.addAction("down arrow", PlayerActions.MovePlayerSouth)
        InputBindingStore.addAction("left arrow", PlayerActions.MovePlayerWest)
        InputBindingStore.addAction("right arrow", PlayerActions.MovePlayerEast)
    },
    render: function() {
        return (
            <Grunt data={this.state.player}/>
        )
    }
})

module.exports = PlaythroughScreen
