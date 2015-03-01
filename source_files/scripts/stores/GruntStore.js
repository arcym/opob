var GruntActions = require("<scripts>/actions/GruntActions")

var GruntStore = Reflux.createStore({
    init: function() {
        this.firebase = new Firebase("https://opob.firebaseIO.com/grunts");
        this.firebase.on("value", function(data) {
            this.data = data.val()
            this.retrigger()
        }.bind(this))
    },
    data: {},
    getData: function() {
        return this.data
    },
    listenables: [
        GruntActions
    ],
    onAddGrunt: function(name) {
        this.firebase.child(name).set({
            x: 2, y: 2, speed: 3
        })
    },
    onRemoveGrunt: function(name) {
        delete this.data[name]
    }
})

module.exports = GruntStore
