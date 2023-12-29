const queue = require("../configs/queue")
const SessionCollection = require("../collections/session")
const { SESSION_QUEUE } = require("../utils/queue")

const sessionQueue = queue.get(SESSION_QUEUE)

sessionQueue.process(async function (job, done) {
    console.log(`Starting process web session ${job.data.sessionId}`)
    const session = new SessionCollection(job.data)
    console.log(`Finished process web session ${job.data.sessionId}`)
    await session.save()
    done()
})

console.log(">>> Loaded sessions queue consumer.")
