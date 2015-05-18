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
    onAddGrunt: function(data) {
        this.firebase.child(data.name).set(data)
        this.firebase.child(data.name).onDisconnect().remove()
    },
    onUpdateGrunt: function(data) {
        this.firebase.child(data.name).set(data)
    }
})

module.exports = GruntStore
