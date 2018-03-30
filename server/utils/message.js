const moment = require('moment');
const generateMessage = (message)=>{
    return {
        from : message.from,
        text : message.text,
        createdAt: moment().format('h:mm:ss')
    }
};

const generateLocMessage = (location)=>{
    return {
        from:location.from,
        url : `https://www.google.com/maps?q${location.latitude},${location.longitude}`,
        createdAt: moment().format('h:mm:ss')
    }
};

module.exports = {generateMessage,generateLocMessage};