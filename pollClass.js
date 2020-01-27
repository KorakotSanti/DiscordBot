const Discord = require('discord.js');
const {face} = require('./emojis/emojis.json');

class pollClass{
    constructor(bot){
        this.bot = bot;
        this.yeslist = [];
        this.nolist = [];
        this.pollMsg = undefined;
    }

    
    async createPoll(message,args){
        if(this.pollMsg){
            await message.reply("There is a poll currently taking place!\n Wait your turn!");
            return;
        }

        // create embed 
        const embed = new Discord.MessageEmbed()
            .setColor('#96f905')
            .setTitle(args.join(" "))
            .setAuthor(message.author.username)
            .setThumbnail('https://www.flyingcalls.com/wp-content/uploads/2016/04/poll.jpeg')
        
        this.pollMsg = await message.channel.send(embed);

        // react to the embeded message
        await this.pollMsg.react(face.bsmile);
        await this.pollMsg.react(face.puke);
        
        return;
    }
}

module.exports = pollClass;