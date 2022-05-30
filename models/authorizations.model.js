const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorizationSchema = new Schema({
    application_id: {
        type: Schema.Types.ObjectId,
        ref: 'Aplications'
    },
    token: {
        type: String
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Authorizations', authorizationSchema);