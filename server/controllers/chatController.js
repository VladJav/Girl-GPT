const Chat = require('../models/Chat');
const { NotFountError, BadRequestError } = require('../errors');
const { checkPermissions } = require('../utils');
const { StatusCodes } = require('http-status-codes');

const getAllChats = async (req, res) => {
    const { userId } = req.user;
    const { page = 1, limit = 20 } = req.query;

    const skip = limit * (page - 1);

    const chats = await Chat.find({ user: userId }).limit(limit).skip(skip);

    res.json({ chats });
};

const getSingleChat = async (req, res) => {
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
const deleteChat = async (req, res) => {
    const { id: chatId } = req.params;

    const chat = await Chat.findById(chatId);
    if (!chat) {
        throw new NotFountError('Chat not found');
    }
    checkPermissions(req.user, chat.user);

    await chat.deleteOne();
    
    res.sendStatus(StatusCodes.NO_CONTENT);
};

const updateChat = async (req, res) => {
    const { id: chatId } = req.params;
    const { title } = req.body;
    
    if (!title) {
        throw new BadRequestError('Provide new chat title');
    }
    
    const chat = await Chat.findById(chatId);
    if (!chat) {
        throw new NotFountError('Chat not found');
    }
    checkPermissions(req.user, chat.user);
    
    chat.title = title;
    await chat.save();

    res.json({ chat });
};

module.exports = {
    getAllChats,
    getSingleChat,
    createChat,
    deleteChat,
    updateChat,
};