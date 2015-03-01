var LoopStore = require("<scripts>/stores/LoopStore")
var InputBindingStore = require("<scripts>/stores/InputBindingStore")
var KeyboardInputStore = require("<scripts>/stores/KeyboardInputStore")
var PlayerStore = require("<scripts>/stores/PlayerStore")
var PlayerActions = require("<scripts>/actions/PlayerActions")
var WorldActions = require("<scripts>/actions/WorldActions")
var ExampleWorld = require("<scripts>/worlds/ExampleWorld")

var Grunt = require("<scripts>/components/Grunt")
var World = require("<scripts>/components/World")

var PlaythroughScreen = React.createClass({
    mixins: [
        Reflux.connect(PlayerStore, "player")
    ],
    componentDidMount: function() {
        WorldActions.LoadWorld(ExampleWorld)
        InputBindingStore.addAction("w", PlayerActions.MovePlayerNorth)
        InputBindingStore.addAction("s", PlayerActions.MovePlayerSouth)
        InputBindingStore.addAction("a", PlayerActions.MovePlayerWest)
        InputBindingStore.addAction("d", PlayerActions.MovePlayerEast)
    },
    render: function() {
        return (
            <div id="playthrough">
                <World/>
                <Grunt data={this.state.player}/>
            </div>
        )
    }
})

module.exports = PlaythroughScreen
