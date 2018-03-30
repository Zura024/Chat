const expect = require('expect');
const {generateMessage,generateLocMessage} = require('./../utils/message');

describe('generateMessage', () => {
    it('Should generate correct message', () => {
        let testMessage = {
            from: 'Zura',
            text: 'Hi'
        };
        let message = generateMessage(testMessage);
        expect(message.createdAt).toBeLessThan(Date.now());
        expect.objectContaining({from: testMessage.from, text: testMessage.text});
    });

    it('Should generate correct LocationMessage', () => {
        let location = {
            from : 'Admin',
            latitude: 2,
            longitude:1,
        };
        let url = 'https://www.google.com/maps?q2,1';
        let locMessage = generateLocMessage(location);
        expect(locMessage.url).toBe(url);
        expect.objectContaining({from: 'Admin'});
    });
});