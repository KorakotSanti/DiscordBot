module.exports = {
    name:'trivia',
    description:'play trivia',
    cooldown: 5,
    usage: 'to play trivia',
    execute(message,args){
        const objList = args.pop();
        const triviabot = objList[2];
    }
}