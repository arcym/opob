var WorldStore = require("<scripts>/stores/WorldStore")
var WorldTile = require("<scripts>/components/WorldTile")

var World = React.createClass({
    mixins: [
        Reflux.connect(WorldStore, "world")
    ],
    render: function() {
        return (
            <div id="world">
                {this.renderTiles()}
            </div>
        )
    },
    renderTiles: function() {
        var renderings = []
        for(var coords in this.state.world.tiles) {
            var tile = this.state.world.tiles[coords]
            renderings.push(
                <WorldTile key={coords} data={tile}/>
            )
        }
        return renderings
    }
})

module.exports = World
