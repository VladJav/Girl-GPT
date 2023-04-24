const mongoose = require('mongoose');
require('./Message');

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