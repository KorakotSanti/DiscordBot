const Discord = require('discord.js');
const ytdl = require('ytdl-core');

class MusicPlayer{
    constructor(bot){
        this.queue = [];
        this.bot = bot;
        this.connection = undefined;
        this.dispatcher = undefined;
        this.currentlyPlaying = "Nothing";
    }

    async play(message){
        // to get the currently playing song.
        let info = await ytdl.getInfo(this.queue[0]);
        this.currentlyPlaying = info.title;

        // to play audio based on youtube video
        this.dispatcher = await this.connection.play(ytdl(this.queue[0], {
            filter:'audioonly', // youtube download settings
            highWaterMark: 1<<25 
        }),{
            volume: 0.5 //dispatcher settings
        });

        message.channel.send(`Currently playing ${this.queue[0]}`);
        // remove the front item from the array
        this.queue.shift();

        // whenever the previous audio is done playing, play
        // the next one on the list
        this.dispatcher.on('end', ()=>{
            if(this.queue[0]){
                this.play(message);
            } else {
                message.channel.send("Leaving voice channel...");
                this.connection.disconnect();
                this.connection = this.dispatcher = undefined;
            }
        });
    }
    async playMusic(message, args){

        // check for video link argument if none, error
        if(!args[0]){
            await message.reply('You need to provide a youtube video link!');
            return;
        }

        // user needs to be in voice channel
        if(!message.member.voice.channel){
            await message.reply('You need to be in a voice channel!');
            return;
        }

        //check if the youtube url is valid
        if(!ytdl.validateURL(args[0])){
            await message.reply("You need to provide a valid youtube video url!\nsuch as https://www.youtube.com/watch?v=y6120QOlsfU");
            await message.reply("Use the \"!help *command*\" to see correct usage of commands");
            return; 
        }

        // getting the current user's server queue and pushing youtube link on there
        this.queue.push(args[0]);

        // bot will join the channel only if it is not already in the channel
        if(!this.connection){
            await message.member.voice.channel.join()
                .then(clientconnection => {
                    this.connection = clientconnection; 
                    this.play(message);
                });
        }
        return;
    }

    // function will be for stoping music
    async stopMusic(message,args){
        await message.reply("This is the stop command");
        return;
    }
    
    // function will be for skipping music
    async skipMusic(message,args){
        if(this.dispatcher){
            this.dispatcher.end();
        }
        return;
    }

    // to display the currently queue
    async musicQueue(message,args){
        // checks if there are any songs in queue
        if(!this.queue){
            await message.channel.send("There is no songs in queue\n to add songs use the !play follow by a youtube link")
        }

        // The message array
        let songs_in_queue = ["Songs in queue","------------------------------------------------------"];
        let songlist = new Array(this.queue.length).fill(" ");

        // go to all the songs indivdually to get the song titles.
        for(let i = 0; i<this.queue.length; i++){
            let info = await ytdl.getInfo(this.queue[i]);
            songlist[i] = `${i+1}. ${info.title}`;
        }

        await message.channel.send([...songs_in_queue,...songlist].join("\n"));
        return;
    }
}

module.exports = MusicPlayer;