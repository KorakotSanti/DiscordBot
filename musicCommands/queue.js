const MusicPlayer = require('../music-player/music.js');

module.exports = {
    name: 'queue',
    description: 'Display the current queue',
    cooldown: 5,
    usage: '!queue',
    async execute(message, args){
        args.pop();
        const musicbot = args.pop();
        musicbot.musicQueue(message);
    }
}