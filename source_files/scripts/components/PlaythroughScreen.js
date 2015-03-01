var LoopStore = require("<scripts>/stores/LoopStore")
var InputBindingStore = require("<scripts>/stores/InputBindingStore")
var KeyboardInputStore = require("<scripts>/stores/KeyboardInputStore")

var PlaythroughScreen = React.createClass({
    componentDidMount: function() {
        InputBindingStore.addAction("w", function(tick) {
            console.log(tick)
        })
    },
    render: function() {
        return (
            <div>Hello World</div>
        )
    }
})

module.exports = PlaythroughScreen
