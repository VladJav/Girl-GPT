const mongoose = require('mongoose');
require('./Message');

const chatSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'New Chat',
    },
    model: {
        type: String,
        default: 'gpt-3.5-turbo',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

chatSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'chat',
});

chatSchema.pre('findOne', function() {
    this.populate('messages');
});


module.exports = mongoose.model('Chat', chatSchema);