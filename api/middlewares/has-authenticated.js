
const hasAuthenticated = (request, response, next) => {
    const apiKey = request.headers['api-key']
    if (apiKey !== process.env.API_KEY) {
        return response.status(403).json({ message: "You can permission to execute that action."})
    }

    next()
}

module.exports = hasAuthenticated