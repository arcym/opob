window.React = require("react")
window.Firebase = require("firebase")
window.Phlux = require("phlux")

window.WIDTH = 20
window.HEIGHT = 15

var Game = require("<scripts>/components/Game")
React.render(<Game/>, document.body)
