var LoopStore = require("<scripts>/stores/LoopStore")
var InputBindingStore = require("<scripts>/stores/InputBindingStore")
var KeyboardInputStore = require("<scripts>/stores/KeyboardInputStore")
var PlayerStore = require("<scripts>/stores/PlayerStore")
var PlayerActions = require("<scripts>/actions/PlayerActions")
var WorldActions = require("<scripts>/actions/WorldActions")
var ExampleWorld = require("<scripts>/worlds/ExampleWorld")

var Grunt = require("<scripts>/components/Grunt")
var World = require("<scripts>/components/World")
var Camera = require("<scripts>/components/Camera")

var PlaythroughScreen = React.createClass({
    mixins: [
        Reflux.connect(PlayerStore, "player")
    ],
    componentDidMount: function() {
        PlayerActions.AddPlayer("andrew")
        WorldActions.LoadWorld(ExampleWorld)
        InputBindingStore.addAction("w", PlayerActions.MovePlayerNorth)
        InputBindingStore.addAction("s", PlayerActions.MovePlayerSouth)
        InputBindingStore.addAction("a", PlayerActions.MovePlayerWest)
        InputBindingStore.addAction("d", PlayerActions.MovePlayerEast)
    },
    componentsWillUnmount: function() {
        PlayerActions.RemovePlayer("andrew")
    },
    render: function() {
        return (
            <div id="playthrough">
                <Camera>
                    <World/>
                    {this.renderGrunts()}
                </Camera>
            </div>
        )
    },
    renderGrunts: function() {
        var renderings = new Array()
        for(var name in this.state.grunts) {
            var grunt = this.state.grunts[name]
            //renderings.push(
            //    <Grunt key={name} data={grunt}/>
            //)
        }
        return renderings
    }
})

module.exports = PlaythroughScreen
