var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
function arrayContains(needle, arrhaystack)
{
    return (arrhaystack.indexOf(needle) > -1);
}
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == auth.prefix) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var var1 = auth.clear;

        var classes = auth.classes;
        var discords = auth.discords;

        if(args.length > 1)
        {
            var1 = args[1];
        }
       
        args = args.splice(1);
        switch(cmd) {
            // !help
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: auth.helptext
                });
            break;
            // !h
            case 'h':
                bot.sendMessage({
                    to: channelID,
                    message: auth.helptext
                });
            break;
            // !classes
            case 'classes':
                bot.sendMessage({
                    to: channelID,
                    message: classes.join("\n")    
                });
            break;
            // !logs
            case 'logs':
                bot.sendMessage({
                    to: channelID,
                    message: 'https://www.warcraftlogs.com/guilds/148308/'
                });
            break;
            // !armory
            case 'armory':
                if(var1!=auth.clear){
                    bot.sendMessage({
                    to: channelID,
                    message: 'https://worldofwarcraft.com/en-us/search?q='+var1
                    });
                }
                else{
                    bot.sendMessage({
                    to: channelID,
                    message: 'http://us.battle.net/wow/en/guild/area-52/Lower_Expectations/'
                });
            }                
            break;
            // !wh
            case 'wh':
                if(var1!=auth.clear){
                    bot.sendMessage({
                    to: channelID,
                    message: 'http://www.wowhead.com/search?q='+var1
                    });
                }
                else{
                    bot.sendMessage({
                    to: channelID,
                    message: 'http://www.wowhead.com/'
                });
            }
            break;
            // !wowhead
            case 'wowhead':
                if(var1!=auth.clear){
                    bot.sendMessage({
                    to: channelID,
                    message: 'http://www.wowhead.com/search?q='+var1
                    });
                }
                else{
                    bot.sendMessage({
                    to: channelID,
                    message: 'http://www.wowhead.com/'
                });
                }
            break;
            // !wdiscord
            case 'wdiscord':
                if(var1!=auth.clear){
                    if(arrayContains(var1, classes)){
                        bot.sendMessage({
                        to: channelID,
                        message: discords[classes.indexOf(var1)]
                    });
                    }
                    else{
                        bot.sendMessage({
                        to: channelID,
                        message:'Please enter a valid class name'
                    });
                    }                    
                }
            break;
            // !canada
            case 'canada':
                var cvar = Math.floor(Math.random() * 6)  
                bot.sendMessage({
                    to: channelID,
                    message: auth.canada[cvar],
                    tts: true
                });
            break;
            // !antorus
            case 'antorus':
                bot.sendMessage({
                    to: channelID,
                    message: 'Guide to Antorus, the Burning Throne:\nhttps://docs.google.com/document/d/e/2PACX-1vRWDsQ5rBqsgUtK2YzRL7T69D0jxwiWokHj7QK1UZtCXAPTD7yRE0a1S-xLBuzVba5V34rOzry4Tbrq/pub'
                });
            break;
            // !minantorus
            case 'minantorus':
                bot.uploadFile({
                    to: channelID,
                    file:"minimalistAntorus.png"                    
                });
            break;
             // !achievements
            case 'achievements':
                bot.sendMessage({
                    to: channelID,
                    message: 'Guide to the various achievements needed for Glory of the Legion Hero:\nhttps://docs.google.com/document/d/e/2PACX-1vTmuj4bID1H2OpRxynbSDoZiVYVrvJdA37LCT8EngdpmKpwObuUTNaauVCGPf__34VstFyjd3qH0Rr6/pub'
                });
            break;
            // !signup
            case 'signup':
                bot.sendMessage({
                    to: channelID,
                    message: 'Link to sign up to various guild events including raids:\nhttps://docs.google.com/spreadsheets/d/1WVKoy4bHFAhy-p2QiDJZRLFOy4YugBG2-EJ8s8TUf1w/edit?usp=sharing'
                });
            break;

            //!----------------------------------!

            // !hi
            case 'hi':
                bot.sendMessage({
                    to: channelID,
                    message: 'Hey'
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});