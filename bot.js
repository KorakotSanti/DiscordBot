// get token to run the bot, and command prefix
const { token, prefix } = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require('fs');
const MusicPlayer = require('./music-player/music.js');

// to play audio from youtube
const ytdl = require('ytdl-core');

// creating the discord bot client and initializing a storage for commands
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// the music player portion of the bot with commands
const musicbot = new MusicPlayer(bot);

// get array of command files from the commands folder
const commandFiles = fs.readdirSync('./commands').filter(file=>file.endsWith('.js'));

// set the commands to the bot
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.once("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    // set the bot's presence to "playing discord.js" on idle
    bot.user.setPresence({activity: {name: "Discord.js"}, status: "idle"})
        .then(console.log)
        .catch(console.error);
});

bot.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(" ");
    const commandName = args.shift().toLowerCase();

    // this checks for music command 
    if(checkMusicCommand(message,args,commandName)) return;

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

bot.on("guildMemberAdd", member => {
    const channel = member.guild.channels.find( ch => ch.name === 'general');

    if(!channel) return;

    channel.send(`Welcome to our server new friend: ${member}`);
});

function checkMusicCommand(message,args,commandName){

    switch(commandName) {
        case 'play':
            musicbot.playMusic(message,args);
            break;
        case 'skip':
            musicbot.skipMusic(message,args);
            break;
        case 'stop':
            musicbot.stopMusic(message,args);
            break;
        case 'queue':
            musicbot.musicQueue(message,args);
            break;
        case 'current':
            musicbot.current(message,args);
            break;
        default:
            return false;
    }

    return true;
    
}
bot.login(token);
