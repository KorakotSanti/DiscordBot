const MusicPlayer = require('../music-player/music.js');

module.exports = {
    name: 'skip',
    description: 'Skip the current song playing',
    cooldown: 5,
    usage: '!skip',
    async execute(message, args){
        args.pop();
        const musicbot = args.pop();
        musicbot.skipMusic(message);
    }
}