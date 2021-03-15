const queue = {
  name: "queue",
  description: "Display the current queue",
  cooldown: 5,
  usage: "!queue",
  async execute(message, args) {
    const objList = args.pop();
    const musicbot = objList[0];
    musicbot.musicQueue(message);
  },
};

export default queue;