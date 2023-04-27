const { BadRequestError } = require('../errors');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const openAi = require('../utils/openAI');
const { checkPermissions } = require('../utils');

const createMessage = async (req, res) => {
    const { chat: chatId, content } = req.body;
    const { userId } = req.user;

    const chat = await Chat.findById(chatId).populate('messages', 'role content -_id -chat');

    if (!chat) {
        throw new BadRequestError('Provide chat');
    }

    checkPermissions(req.user, chat.user);

    await Message.create({
        user: chat.user,
        chat: chat._id,
        role: 'user',
        content,
    });

    const messages = [...chat.messages, { role: 'user', content }];

    const { data: { choices } } = await openAi.createChatCompletion({
        model: chat.model,
        messages: messages,
    });

    const responseMessage = await Message.create({ user: userId, chat: chat._id , ...choices[0].message });

    res.json({ response: responseMessage });
};

const getMessage = (req, res) => {
    res.send('Get Message');
};

module.exports = {
    getMessage,
    createMessage,
};