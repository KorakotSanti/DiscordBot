const MusicPlayer = require('../music-player/music.js');

module.exports = {
    name: 'pause',
    description: 'pause the music',
    cooldown: 5,
    usage: '!pause',
    async execute(message, args){
        const objList = args.pop()
        const musicbot = objList[0];
        musicbot.pause(message);
    }
}