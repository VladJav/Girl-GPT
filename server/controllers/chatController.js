const getAllChats = (req, res) => {
    res.send('Get All Chats');
};

const getSingleChat = (req, res) => {
    res.send('Get Single Chat');
};

const createChat = (req, res) => {
    res.send('Create Chat');
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