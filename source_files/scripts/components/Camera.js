var WorldStore = require("<scripts>/stores/WorldStore")
var PlayerStore = require("<scripts>/stores/PlayerStore")

var Camera = React.createClass({
    mixins: [
        Reflux.connect(PlayerStore, "player"),
        Reflux.connect(WorldStore, "world")
    ],
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>
        )
    },
    renderStyles: function() {
        var x = -this.state.player.x + (WIDTH / 2)
        var y = -this.state.player.y + (HEIGHT / 2)
        x = Math.min(Math.max(x, (this.state.world.width - WIDTH) * -1), 0)
        y = Math.min(Math.max(y, (this.state.world.height - HEIGHT) * -1), 0)
        return {
            "top": y + "em",
            "left": x + "em",
            "position": "absolute"
        }
    }
})

module.exports = Camera