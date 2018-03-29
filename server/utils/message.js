const generateMessage = (message)=>{
    return {
        from : message.from,
        text : message.text,
        createdAt: Date.now()
    }
};

module.exports = {generateMessage};