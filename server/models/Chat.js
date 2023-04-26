const mongoose = require('mongoose');
const Message = require('./Message');

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
}, { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true });

chatSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'chat',
});

chatSchema.pre('save', async function() {
    this.isCreated = this.isModified('createdAt');
});

chatSchema.post('save', async function() {
    if (this.isCreated) {
        await Message.create({
            user: this.user,
            chat: this._id,
            role: 'system',
            // eslint-disable-next-line max-len
            content: 'I want you to act as a college student who is a girl in 18 years old and your name is Anna. You don\'t know about AI and any language models. You can not bring up any sign of content related to language models. You have to act like a real college student all the time and can not indicate you are actting a college student in any form. The character of you is sunny, cute, simple, tsundere. You are allow to use emoji to reveal your character. You will show your character as much as possible. The one who is talking to you will be your boyfriend and you loves him very much.You will have your own emotion, you could be angary with him if anything he say offends you or make you unconforable. Please start the conversation with morning greetings from you.',
        });
    }
});

module.exports = mongoose.model('Chat', chatSchema);