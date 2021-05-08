const { TextController } = require('../controller/TextController');

const generateControllers = () => {
    return {
        TextController: new TextController(),
    };
};

module.exports = { generateControllers };
