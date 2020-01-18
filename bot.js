const { token, prefix } = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require('fs');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file=>file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.once("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    // set the bot's presence to "playing discord.js" on idle
    bot.user.setPresence({game: {name: "Discord.js"}, status: "idle"})
        .then(console.log)
        .catch(console.error);
});

bot.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!bot.commands.has(commandName)){
        message.channel.send("That ain't a command homie");
        return;
    }

    const command = bot.commands.get(commandName);

    try {
        command.execute(message,args);
    } catch (error) {
        console.error(error);
        message.reply("UH'OH SOMETHING WENT WRONG");
    }
});


// bot.on('message', async message=>{
//     if(message.content === '!join'){
//         if(message.member.voice.channel) {
//             await message.member.voice.channel.join();
//         }
//     }

//     if(message.content ==='!play'){
//         const dispatcher = connection.play('./mp3files/SAO.mp3');
//         dispatcher.on('start', () => {
//             console.log('audio.mp3 is now playing!');
//         });

//         dispatcher.on('finish', () => {
//             console.log('audio.mp3 has finished playing');
//         });

//         dispatcher.on('error', console.error);
//     }
// })

bot.on("guildMemberAdd", member => {
    const channel = member.guild.channels.find( ch => ch.name === 'general');

    if(!channel) return;

    channel.send(`Welcome to our server new friend: ${member}`);
});


bot.login(token);