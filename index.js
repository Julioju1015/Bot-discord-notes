const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();

//////////Charg les commandes dans les sous-dossier de ./commandes///////////
fs.readdirSync("./notes/").forEach(dirs => {
    let commands = fs.readdirSync(`./notes/${dirs}`).filter(files => files.endsWith('.js'))
    for(let file of commands) {
        let getFileName = require(`./notes/${dirs}/${file}`)
        client.commands.set(getFileName.help.name, getFileName)
    }
})

////////////Charge les Events////////
fs.readdir('./Events/', (error, f) => {
    if(error) return console.error(error)
    console.log(`${f.length} events chargés`);

    f.forEach((f) => {
        let events = require(`./Events/${f}`);
        let event = f.split('.')[0];
        client.on(event, events.bind(null, client));
    });
});


////TOKEN DU BOT//////////
client.login('Votre token')
