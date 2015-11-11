
module.exports = {
    identity: 'todo',
    connection: 'default',
    attributes: {
        date: {
            type: 'datetime',
            defaultsTo: function () { return new Date(); },
            required: true,
        },
        status: {
            type: 'string',
            enum: ['new', 'success', 'rejected'],
            required: true,
        },
        location: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            required: true,
        },

        user: {
            model: 'user',
        },
    }
}

