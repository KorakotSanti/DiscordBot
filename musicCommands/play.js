const MusicPlayer = require('../music-player/music.js');

module.exports = {
    name: 'play',
    description: 'plays youtube video\'s audio through link',
    cooldown: 5,
    usage: '!play "youtube link" (remove the quotations)',
    async execute(message, args){
        args.pop();
        const musicbot = args.pop();
        musicbot.playMusic(message,args);
    }
}