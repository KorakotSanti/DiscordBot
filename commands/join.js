module.exports = {
    name: 'join',
    description: 'bot joins the discord Voice Channel user is currently in',
    async execute(message, args){
        // check if the user is in a voice channel
        if(message.member.voice.channel){
            await message.member.voice.channel.join();
        } else {
            message.reply('Please join a voice channel to use this command');
        }
    }
}