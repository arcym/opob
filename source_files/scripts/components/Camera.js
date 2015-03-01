var WorldStore = require("<scripts>/stores/WorldStore")
var PlayerStore = require("<scripts>/stores/PlayerStore")

var Camera = React.createClass({
    mixins: [
        Reflux.connect(PlayerStore, "player")
    ],
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>
        )
    },
    renderStyles: function() {
        //var x = ((this.state.player.x - 5) * -1)
        //var xmax = (WorldStore.getWidth() - GameFrameStore.getWidth()) * -1
        //x = Math.min(x, 0)
        //x = Math.max(x, xmax)
        var x = Math.floor(this.state.player.x / WIDTH) * -WIDTH
        var y = Math.floor(this.state.player.y / HEIGHT) * -HEIGHT
        return {
            "top": y + "em",
            "left": x + "em",
            "position": "absolute"
        }
    }
})

module.exports = Camera