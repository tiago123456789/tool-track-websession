require("dotenv").config()
const path = require("path")
const express = require("express")
const { v4 } = require('uuid')
const app = express()
var cors = require('cors')
require("./configs/database")
const queue = require("./configs/queue")
const sessionCollection = require("./collections/session")
const hasAuthenticated = require("./middlewares/has-authenticated")
const { SESSION_QUEUE, OPTIONS_PUBLISH_MESSAGE } = require("./utils/queue")

app.use(express.json())
app.use(cors())

const sessionQueue = queue.get(SESSION_QUEUE)

app.post("/events", hasAuthenticated, (request, response) => {
    const data = request.body
    data.sessionId = `${v4()}${new Date().getTime()}`
    data.createdAt = new Date()
    sessionQueue.add(data, OPTIONS_PUBLISH_MESSAGE)
    return response.sendStatus(200)
})

app.get("/records-sessions/:sessionId", async (request, response) => {
    const sessionId = request.params.sessionId
    const session = await sessionCollection.findOne({ sessionId })
    if (!session) {
        return response.status(404).json({ "message": "Session not found" })
    }
    return response.json(session)
})

app.get("/sessions", async (request, response) => {
    const data = await sessionCollection.find({}, { sessionId: 1, route: 1, createdAt: 1, userAgent: 1 })
    return response.json(data)
})

app.listen(3000, () => console.log("Server is running at http://localhost:3000"))