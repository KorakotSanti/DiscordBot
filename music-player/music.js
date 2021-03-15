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
            volume: 0.1 //dispatcher settings
        });

        message.channel.send(`Currently playing ${this.queue[0]}`);
        // remove the front item from the array
        this.queue.shift();

        // whenever the previous audio is done playing, play
        // the next one on the list
        this.dispatcher.on('end', ()=>{
            this.currentlyPlaying = "Nothing";
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
    async stopMusic(message){
        if(!this.dispatcher){
            await message.reply('There is no music playing right now ...');
            return;
        }

        await message.reply('Stopping music player...');
        // empty the queue before doing anything
        this.queue = [];
        // ending the played music
        this.dispatcher.end();
        return;
    }
    
    // function will be for skipping music
    async skipMusic(message){
        if(this.dispatcher){
            await message.channel.send('Skipping Song...'); 
            this.dispatcher.end();
            return;
        }

        await message.channel.send('There is no music playing right now...');
        return;
    }

    // to display the currently queue
    async musicQueue(message){
        // checks if there are any songs in queue
        if(this.queue.length == 0){
            await message.channel.send("There is no songs in queue\n to add songs use the !play follow by a youtube link")
            return;
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

    // send in message channel the current song playing
    async current(message){
        message.channel.send(`${this.bot.user} is currently playing: ${this.currentlyPlaying}`);
        return;
    }

    // pauses the music 
    async pause(message){
        // checks if there is an active dispatcher
        if(!this.dispatcher){
            await message.channel.send('There are no music playing at the moment.');
            return;
        }
        // check if it is already paused or not
        if(this.dispatcher.paused){
            await message.channel.send(`${this.bot.user.tag} is currently paused at the moment.`);
            return;
        }

        this.dispatcher.pause([true]);
        message.channel.send('Music is pausing...');
        return;
    }

    //resume the music if it is paused
    async resume(message){
        //checks if the dispatcher is active
        if(!this.dispatcher){
            await message.channel.send('The bot isn\'t currently paused or playing any music at the moment.');
            return;
        }

        // check for not paused state
        if(!this.dispatcher.paused){
            await message.channel.send('You can only use this command when the bot is paused.');
            return;
        }

        this.dispatcher.resume();
        message.channel.send('Resuming the Party! I mean music...');
        return;
    }
}

export default MusicPlayer;