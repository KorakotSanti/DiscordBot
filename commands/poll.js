const pollClass = require('../featureClass/pollClass.js');

module.exports = {
    name: 'poll',
    description: 'makes a poll',
    cooldown: 5,
    usage: '!poll "Yes or No Question" (leave the parentheses)',
    execute(message,args){
        const objList = args.pop();
        const poll = objList[1];
        poll.createPoll(message,args);
        return;
    }
}