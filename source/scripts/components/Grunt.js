var Grunt = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        return {
            "width": this.props.data.size + "em",
            "height": this.props.data.size + "em",
            "top": this.props.data.y - (this.props.data.size / 2) + "em",
            "left": this.props.data.x - (this.props.data.size / 2) + "em",
            "position": "absolute",
            "backgroundColor": "red"
        }
    }
})

module.exports = Grunt
