const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorizationSchema = new Schema({
    application_id: {
        type: Schema.Types.ObjectId,
        ref: 'Aplications'
    },
    type: {
        type: String
    },
    priority: {
        type: String
    },
    path: {
        type: String
    },
    message: {
        type: String
    },
    request: {
        type: Schema.Types.Mixed
    },
    response: {
        type: Schema.Types.Mixed
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Logs', authorizationSchema);