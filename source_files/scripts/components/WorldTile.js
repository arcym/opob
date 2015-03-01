var WorldTile = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        return {
            "width": "1.025em",
            "height": "1.025em",
            "top": this.props.data.y + "em",
            "left": this.props.data.x + "em",
            "position": "absolute",
            "backgroundColor": "#444"
        }
    }
})

module.exports = WorldTile
