const pollCommand = {
  name: "poll",
  description: "makes a poll",
  cooldown: 5,
  usage: '!poll "Yes or No Question" (leave the parentheses)',
  execute(message, args) {
    const objList = args.pop();
    const poll = objList[1];
    poll.createPoll(message, args);
    return;
  },
};

export default pollCommand;
