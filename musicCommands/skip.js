const MusicPlayer = require('../music-player/music.js');

module.exports = {
    name: 'skip',
    description: 'Skip the current song playing',
    cooldown: 5,
    usage: '!skip',
    async execute(message, args){
        const objList = args.pop()
        const musicbot = objList[0];
        musicbot.skipMusic(message);
    }
}