const generateMessage = (message)=>{
    return {
        from : message.from,
        text : message.text,
        createdAt: Date.now()
    }
};

const generateLocMessage = (from,location)=>{
    return {
        from,
        url : `https://www.google.com/maps?q${location.latitude},${location.longitude}`,
        createdAt: Date.now()
    }
};

module.exports = {generateMessage,generateLocMessage};