// get token to run the bot, and command prefix
import dotenv from "dotenv";
import Discord from "discord.js";
import MusicPlayer from "./music-player/music.js";
import PollClass from "./featureClass/pollClass.js";
import Trivia from "./featureClass/trivia.js";
import commandLists from './commands';
import musicCommands from './musicCommands';

// to play audio from youtube
import ytdl from "ytdl-core";

// access env
dotenv.config();

const { DISCORD_TOKEN: token, PREFIX: prefix } = process.env;
// creating the discord bot client and initializing a storage for commands
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// the music player portion of the bot with commands
const musicbot = new MusicPlayer(bot);
const pollbot = new PollClass(bot);
const triviabot = new Trivia(bot);

// set the commands to the bot
for (let command of commandLists) {
  bot.commands.set(command.name, command);
}
for (const command of musicCommands) {
  bot.commands.set(command.name, command);
}

bot.once("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  // set the bot's presence to "playing discord.js" on idle
  bot.user
    .setPresence({ activity: { name: "Discord.js" }, status: "idle" })
    .then(console.log)
    .catch(console.error);
});

bot.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // spliting the user message into arrays slicing off the command prefix
  // args[0] will always represent the commandName
  const args = message.content.slice(prefix.length).split(" ");
  const commandName = args.shift().toLowerCase();

  // append musicbot object to the end of the args
  let objList = [musicbot, pollbot, triviabot];
  args.push(objList);

  // check if bot has the commands of not
  if (!bot.commands.has(commandName)) {
    message.channel.send("That ain't a command homie");
    return;
  }

  // get the command object according to the command name
  const command = bot.commands.get(commandName);

  // execute the command
  // each commands has a different execute function
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("UH'OH SOMETHING WENT WRONG");
  }
});

// does something when someone new joins the discord server
bot.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.find((ch) => ch.name === "general");

  if (!channel) return;

  channel.send(`Welcome to our server new friend: ${member}`);
});

bot.login(token);
