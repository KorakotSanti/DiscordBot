const helloCommand = {
  name: "hello",
  aliases: ["hi", "hey"],
  description: "says hello",
  execute(message, args) {
    message.reply("HELLO");
  },
};

export default helloCommand;
