const createMessage = (req, res) => {
    res.send('Create Message');
};

const getMessage = (req, res) => {
    res.send('Get Message');
};

module.exports = {
    getMessage,
    createMessage,
};