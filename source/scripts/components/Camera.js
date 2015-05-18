var Camera = React.createClass({
    propTypes: {
        target: React.PropTypes.shape({
            x: React.PropTypes.number.isRequired,
            y: React.PropTypes.number.isRequired
        }).isRequired,
        bounds: React.PropTypes.shape({
            width: React.PropTypes.number.isRequired,
            height: React.PropTypes.number.isRequired
        })
    },
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>
        )
    },
    renderStyles: function() {
        var x = this.props.target.x * -1 + (WIDTH / 2)
        var y = this.props.target.y * -1 + (HEIGHT / 2)
        if(this.props.bounds != undefined) {
            x = Math.min(Math.max(x, (this.props.bounds.width - WIDTH) * -1), 0)
            y = Math.min(Math.max(y, (this.props.bounds.height - HEIGHT) * -1), 0)
        }
        return {
            top: y + "em",
            left: x + "em",
            position: "absolute"
        }
    }
})

module.exports = Camera
