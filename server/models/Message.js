const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'assistant', 'system'],
        required: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

messageSchema.pre('find', function() {
    this.populate('messages');
});

module.exports = mongoose.model('Message', messageSchema);