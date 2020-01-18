module.exports = {
    name: "hello",
    aliases: ["hi", "hey"],
    description: "says hello",
    execute(message, args){
        message.reply("HELLO");
    }
}