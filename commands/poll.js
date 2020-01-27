const pollClass = require('../pollClass.js');

module.exports = {
    name: 'poll',
    description: 'makes a poll',
    cooldown: 5,
    usage: '!poll "Yes or No Question" (leave the parentheses)',
    execute(message,args){
        const poll = args.pop();
        args.pop();
        poll.createPoll(message,args);
        return;
    }
}