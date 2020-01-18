module.exports = {
    name: 'leave',
    description: 'bot leaves the voice channel',
    async execute(message, args){
        // check for user in voice channel
        if(message.member.voice.channel){
            // leaves voice channel
            await message.member.voice.channel.leave();
            message.channel.send("Leaving the Voice Channel");
                
        } else {
            message.reply("please be in a voice channel of the bot before using this command");
        }
    }
}