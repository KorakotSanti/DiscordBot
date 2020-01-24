const MusicPlayer = require('../music-player/music.js');

module.exports = {
    name: 'resume',
    description: 'resume the music if paused',
    cooldown: 5,
    usage: '!resume',
    async execute(message, args){
        const musicbot = args.pop();
        musicbot.resume(message);
    }
}