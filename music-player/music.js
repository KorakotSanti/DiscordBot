const Discord = require('discord.js');
const ytdl = require('ytdl-core');

class MusicPlayer{
    constructor(servers,bot){
        this.servers = servers;
        this.bot = bot;
    }

    async playMusic(message, args){
        function play(connection, message, server){
            // to play audio based on youtube video
            server.dispatcher = connection.play(ytdl(server.queue[0], {filter:'audioonly'}));

            // remove the front item from the array
            server.queue.shift();

            // whenever the previous audio is done playing, play
            // the next one on the list
            server.dispatcher.on('end', ()=>{
                if(server.queue[0]){
                    play(connection,message,server);
                } else {
                    message.channel.send("Leaving voice channel...");
                    connection.disconnect();
                }
            });
        }

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

        // add queue to server with no previous queue
        if(!this.servers[message.guild.id]){
            this.servers[message.guild.id] = {
                queue: []
            }
        } 

        // getting the current user's server queue and pushing youtube link on there
        let server = this.servers[message.guild.id];
        server.queue.push(args[0]);
        
        // bot will join the channel only if it is not already in the channel
        if(!message.guild.voiceConnection){
            await message.member.voice.channel.join()
                .then(connection => {
                    play(connection,message,server);
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
        await message.reply("This is the skip command");
        return;
    }

    // function for adding music to queue   
    async addmusic(message,args){
        if(!args[0]){
            message.reply('please provide an youtube video link');
            return;
        }

        if(!this.servers[message.guild.id]){
            this.servers[message.guild.id] = {
                queue:[]
            }
            message.reply('please use the !play command to play the music');
            return;
        }

        if(!this.servers[message.guild.id].queue){
            message.reply('please use the !play command to play the music\n Only use the !addmusic command to add music when bot is already playing music');
            return;
        }

        // adding the music to the queue
        this.servers[message.guild.id].queue.push(args[0]);
    }
}

module.exports = MusicPlayer;