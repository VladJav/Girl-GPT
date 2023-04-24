const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    model: {
        type: String,
        default: 'gpt-3.5-turbo',
    },
}, {
    toJSON: true,
    toObject: true,
});

chatSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'chat',
});

module.exports = mongoose.model('Chat', chatSchema);