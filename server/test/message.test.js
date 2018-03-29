const expect = require('expect');
const {generateMessage} = require('./../utils/message');

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
});