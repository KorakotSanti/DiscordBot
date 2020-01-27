// get token to run the bot, and command prefix
const { token, prefix } = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require('fs');
const MusicPlayer = require('./music-player/music.js');
const pollClass = require('./pollClass.js');

// to play audio from youtube
const ytdl = require('ytdl-core');

// creating the discord bot client and initializing a storage for commands
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// the music player portion of the bot with commands
const musicbot = new MusicPlayer(bot);
const pollbot = new pollClass(bot);

// get array of command files from the commands folder
const commandFiles = fs.readdirSync('./commands').filter(file=>file.endsWith('.js'));
const musicCommands = fs.readdirSync('./musicCommands').filter(file=>file.endsWith('.js'));
// set the commands to the bot
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}
for (const file of musicCommands) {
    const command = require(`./musicCommands/${file}`);
    bot.commands.set(command.name,command);
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
    
    // spliting the user message into arrays slicing off the command prefix
    // args[0] will always represent the commandName
    const args = message.content.slice(prefix.length).split(" ");
    const commandName = args.shift().toLowerCase();

    // append musicbot object to the end of the args
    args.push(musicbot);
    args.push(pollbot);

    // check if bot has the commands of not
    if(!bot.commands.has(commandName)){
        message.channel.send("That ain't a command homie");
        return;
    }

    // get the command object according to the command name
    const command = bot.commands.get(commandName);

    // execute the command
    // each commands has a different execute function
    try {
        command.execute(message,args);
    } catch (error) {
        console.error(error);
        message.reply("UH'OH SOMETHING WENT WRONG");
    }
});

// does something when someone new joins the discord server
bot.on("guildMemberAdd", member => {
    const channel = member.guild.channels.find( ch => ch.name === 'general');

    if(!channel) return;

    channel.send(`Welcome to our server new friend: ${member}`);
});

bot.login(token);
