const MusicPlayer = require('../music-player/music.js');

module.exports = {
    name: 'play',
    description: 'plays youtube video\'s audio through link',
    cooldown: 5,
    usage: '!play "youtube link" (remove the quotations)',
    async execute(message, args){
        const objList = args.pop()
        const musicbot = objList[0];
        musicbot.playMusic(message,args);
    }
}