const MusicPlayer = require('../music-player/music.js');

module.exports = {
    name: 'pause',
    description: 'pause the music',
    cooldown: 5,
    usage: '!pause',
    async execute(message, args){
        args.pop();
        const musicbot = args.pop();
        musicbot.pause(message);
    }
}