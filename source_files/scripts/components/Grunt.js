var Grunt = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        return {
            width: "1em",
            height: "1em",
            top: this.props.data.y - 0.5 + "em",
            left: this.props.data.x - 0.5 + "em",
            backgroundColor: "red",
            position: "absolute",
        }
    }
})

module.exports = Grunt
