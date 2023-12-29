function TrackerSession(options) {
    let endpointOptions = {
        url: "http://localhost:3000"
    }
    let events = [];
    let seconds = options?.seconds || 30

    if (!options.apiKey) {
        throw new Error("You forgot informed apiKey on options.")
    }

    function _publishSession(events) {
        fetch(`${endpointOptions.url}/events`, {
            method: 'POST',
            headers: {
                "api-key": options.apiKey,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                useAgent: window.navigator.userAgent,
                route: location.pathname,
                events 
            })
        })
    }

    function _syncronize() {
        setInterval(async () => {
            await _publishSession(events)
            events = []
        }, seconds * 1000)
    }

    function start() {
        _syncronize()
        rrweb.record({
            emit(event) { events.push(event) },
        });
    }

    return {
        start
    }
}

