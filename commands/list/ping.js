const pingCommand = {
  name: "ping",
  description: "Ping!",
  execute(message, args) {
    message.channel.send("Pong");
  },
};

export default pingCommand;
