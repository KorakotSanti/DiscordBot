const MusicPlayer = require('../music-player/music.js');

module.exports = {
    name: 'queue',
    description: 'Display the current queue',
    cooldown: 5,
    usage: '!queue',
    async execute(message, args){
        const objList = args.pop()
        const musicbot = objList[0];
        musicbot.musicQueue(message);
    }
}