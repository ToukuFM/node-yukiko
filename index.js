'use strict';

// REQUIRES ================================================================= #

var slack = require('easy-slackbot');
var SlackBot = slack.Bot;

// COMMANDS ================================================================= #

var touku = require('./lib/commands/touku');
var ToukuScheduleCommand = touku.ToukuScheduleCommand;
var ToukuTeamCommand = touku.ToukuTeamCommand;
var ToukuNowPlayingCommand = touku.ToukuNowPlayingCommand;
var HelloCommand = require('./lib/commands/hello');
var WelcomeCommand = require('./lib/commands/welcome');
var FaqCommand = require('./lib/commands/faq');
var IpCommand = require('./lib/commands/ip');
var WaifuCommand = require('./lib/commands/waifu');
var SuggestCommand = require('./lib/commands/suggest');
var HelpCommand = require('./lib/commands/help');
var AnimeCommand = require('./lib/commands/anime');
var SayCommand = require('./lib/commands/say');
var ImojiCommand = require('./lib/commands/imoji');

// Anonymous commands
var PomfCommand = (data, ctx, slack, callback) => {
    callback('*Wahh!* What are we gonna do on the bed?');
};

// SETUP ==================================================================== #

var slackbot = new SlackBot({
    token: 'your token here',
    name: 'U0J1BG81G',
    welcome: console.log,
    prefix: '!',
    commands: [
        new HelloCommand(),
        new WelcomeCommand(),
        new FaqCommand(),
        new IpCommand(),
        new WaifuCommand(),
        new SuggestCommand(), // Replace channel ID in this file
        new HelpCommand(),
        new AnimeCommand(),
        new ToukuScheduleCommand(),
        new ToukuNowPlayingCommand(),
        new ToukuTeamCommand(),
        new SayCommand(),
        new ImojiCommand(), // Replace Imoji API in this file
    ],
});

// Add anonymous commands
slackbot.addCommandDirectly('pomf', PomfCommand);

// Initialize and connect
slackbot.connect();


// IRC ====================================================================== #
var irc = require("irc");

var ircbot = new irc.Client('irc.rizon.net', 'Yukiko', {
    channels: ['#touku']
});

ircbot.addListener("message", function(from, to, text, message) {
    // Pipe the message to #irc
    slackbot.sendMsg('C0JLRQ6RY', `*${from}:* ${text}`);
});

ircbot.addListener('join', function(channel, nick, message) {
    slackbot.sendMsg('C0JLRQ6RY', `_${nick} joined the channel._`);
});

ircbot.addListener('part', function(channel, nick, reason, message) {
    slackbot.sendMsg('C0JLRQ6RY', `_${nick} left the channel._`);
});

ircbot.addListener('pm', function(nick, text, message) {
    slackbot.sendPM('D0J1948HZ', `*PM* from _${nick}_: ${message.command}`);
});

ircbot.addListener('error', function(message) {
    slackbot.sendMsg('C0JLRQ6RY', `*IRC Error: * \`${message}\``);
});

// TODO:
// - add a real welcome handler
// - multiple word commands such as 'who made you'
// - change HelpCommand to lookup all commands in solution
// - retweet command
// - roundup integration, somehow?
// - Send messages from slack to irc?

// - Add to readme: 
//      "please note, Command.handler()'s scope is not Command."
//      The scope is the SlackAPI instead.