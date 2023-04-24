const Chat = require('../models/Chat');
const { NotFountError } = require('../errors');
const { checkPermissions } = require('../utils');

const getAllChats = async (req, res) => {
    const { userId } = req.user;
    
    const chats = await Chat.find({ user: userId });

    res.json({ chats });
};

const getSingleChat = async (req, res) => {
    const { userId } = req.user;
    const { id: chatId } = req.params;

    const chat = await Chat.findById(chatId);
    if (!chat) {
        throw new NotFountError('Chat not found');
    }

    checkPermissions(req.user, chat.user);

    res.json({ chat });
};

const createChat = async (req, res) => {
    const { userId } = req.user;
    
    const chat = await Chat.create({ user: userId });
    
    res.json({ chat });
};
const deleteChat = (req, res) => {
    res.send('Delete Chat');
};

const updateChat = (req, res) => {
    res.send('Update Chat');
};

module.exports = {
    getAllChats,
    getSingleChat,
    createChat,
    deleteChat,
    updateChat,
};