const current = {
  name: "current",
  description: "display the title of the current audio playing",
  cooldown: 5,
  usage: "!current",
  async execute(message, args) {
    const objList = args.pop();
    const musicbot = objList[0];
    musicbot.current(message);
  },
};

export default current;