const stop = {
  name: "stop",
  description:
    "stop the music completely, deletes the queue, and bot leaves the voice channel",
  cooldown: 5,
  usage: "stop",
  async execute(message, args) {
    const objList = args.pop();
    const musicbot = objList[0];
    musicbot.stopMusic(message);
  },
};

export default stop;