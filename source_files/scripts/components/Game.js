var GameFrame = require("<scripts>/components/GameFrame")
var PlaythroughScreen = require("<scripts>/components/PlaythroughScreen")

var Game = React.createClass({
    render: function() {
        return (
            <GameFrame>
                <PlaythroughScreen/>
            </GameFrame>
        )
    }
})

module.exports = Game
