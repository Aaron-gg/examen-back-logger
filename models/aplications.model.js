const mongoose = require('mongoose');
const { Schema } = mongoose;

const aplicationSchema = new Schema({
    name: {
        type: String
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Aplications', aplicationSchema);