const Queue = require('bull');

const queueInstances = {}

function get(name) {
    if (queueInstances[name]) {
        return queueInstances[name];
    }

    queueInstances[name] = new Queue(name);
    return queueInstances[name];
}

module.exports = {
    get
}