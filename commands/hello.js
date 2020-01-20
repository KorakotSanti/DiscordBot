async function testfunc(message,args){
    await message.reply("This is the function");
};

module.exports = {
    name: "hello",
    aliases: ["hi", "hey"],
    description: "says hello",
    execute(message, args){
        message.reply("HELLO");
        testfunc(message,args);
    }
}