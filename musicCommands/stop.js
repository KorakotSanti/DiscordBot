const MusicPlayer = require('../music-player/music.js');

module.exports = {
    name: 'stop',
    description: 'stop the music completely, deletes the queue, and bot leaves the voice channel',
    cooldown: 5,
    usage: 'stop',
    async execute(message, args){
        const musicbot = args.pop();
        musicbot.stopMusic(message);
    }
}