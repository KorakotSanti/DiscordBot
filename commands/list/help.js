// to get the command prefix from botsettings
const prefix = "!";
const helpCommand = {
  name: "help",
  description: "List of all of my commands or info about specific command",
  aliases: ["commands"],
  usage: "[command name]",
  cooldown: 5,
  execute(message, args) {
    // to store all the commands data available
    const data = [];
    // get all of the bot's stored commands
    const { commands } = message.client;
    args.pop();
    // check if there are any arguments that follows the command
    if (!args.length) {
      data.push("List of all commands");
      // add all the command string in data
      data.push(commands.map((command) => command.name).join(",\n"));
      data.push(
        `\n You can send \'${prefix}help [command name]\' to get info on a specific command!`
      );

      //sends the command to the direct message of the user that requested the commands
      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === "dm") return;
          message.reply("I've send you a DM with all my commands!");
        })
        .catch((error) => {
          console.error(
            `Could not send help DM to ${message.author.tag}.\n`,
            error
          );
          message.reply(`it seems like I can\'t dm you!`);
        });
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((com) => com.aliases && com.aliases.includes(name));

    // checks if it is a command
    if (!command) {
      return message.reply(`That\'s not a valid command homie`);
    }

    // add all the command info to one array
    data.push(`Command Name: ${command.name}`);

    if (command.aliases) data.push(`Aliases: [${command.aliases.join(", ")}]`);
    if (command.description) data.push(`Description: ${command.description}`);
    if (command.usage)
      data.push(`Usage: ${prefix}${command.name} ${command.usage}`);
    data.push(`Cooldown: ${command.cooldown || 3} second(s)`);

    // send in dm all the info of the command
    message.channel.send(data, { split: true });
  },
};

export default helpCommand;
