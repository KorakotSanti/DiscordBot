const resume = {
  name: "resume",
  description: "resume the music if paused",
  cooldown: 5,
  usage: "!resume",
  async execute(message, args) {
    const objList = args.pop();
    const musicbot = objList[0];
    musicbot.resume(message);
  },
};

export default resume;