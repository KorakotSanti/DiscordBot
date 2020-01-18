module.exports = {
    name: 'play',
    description: '{Work in Progress} Currently plays a mp3 file of Sword Arts Online Alicization Season 1 Opening',
    async execute(message, args){
        // attempts to play music but needs to get connection to play
        message.member.voiceChannel.play('../mp3files/SAO.mp3');
    }
}