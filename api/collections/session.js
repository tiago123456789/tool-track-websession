let mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.SchemaTypes.String
    },
    useAgent: {
        type: mongoose.SchemaTypes.String
    },
    route: {
        type: mongoose.SchemaTypes.String
    },
    events: [],
    createdAt: {
        type: mongoose.SchemaTypes.Date 
    }
})

module.exports = mongoose.model("sessions", sessionSchema)