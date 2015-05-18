var Grunt = require("<scripts>/components/Grunt")
var World = require("<scripts>/components/World")
var Camera = require("<scripts>/components/Camera")
var GameFrame = require("<scripts>/components/GameFrame")

var GruntStore = Phlux.createStore({
    data: {
        x: WIDTH / 2,
        y: HEIGHT / 2,
        size: 1
    }
})

var WorldStore = Phlux.createStore({
    data: {
        width: 40,
        height: 30,
        tiles: {}
    },
    initiateStore: function() {
        var world = require("<assets>/worlds/ExampleWorld")
        this.data.width = world.width
        this.data.height = world.height
        for(var x = 0; x < world.width; x++) {
            for(var y = 0; y < world.height; y++) {
                var xy = y * world.width + x
                this.data.tiles[x + "x" + y] = {
                    "value": world.layers[0].data[xy]-1,
                    "position": {"x": x, "y": y}
                }
            }
        }
    }
})

var Game = React.createClass({
    mixins: [
        Phlux.connectStore(WorldStore, "world"),
        Phlux.connectStore(GruntStore, "grunt")
    ],
    render: function() {
        return (
            <GameFrame aspect-ratio="20x15">
                <Camera target={this.state["grunt"]} bounds={this.state["world"]}>
                    <World data={this.state["world"]}/>
                    <Grunt data={this.state["grunt"]}/>
                </Camera>
            </GameFrame>
        )
    },
    renderEntities: function(Class, data) {
        var renderings = []
        for(var index in data) {
            renderings.push(
                <Grunt key={index}
                    data={data[index]}/>
            )
        }
        return renderings
    }
})

module.exports = Game
