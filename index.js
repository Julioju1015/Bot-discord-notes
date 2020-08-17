const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();

//////////Charg les commandes dans les sous-dossier de ./commandes///////////
fs.readdirSync("./commandes/").forEach(dirs => {
    let commands = fs.readdirSync(`./commandes/${dirs}`).filter(files => files.endsWith('.js'))
    for(let file of commands) {
        let getFileName = require(`./commandes/${dirs}/${file}`)
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

/////// PARTIE ERREURS //////

client.utils = new Discord.Collection();

fs.readdir('./utils/', (err, files) =>{
    if(err) throw err;
    for(let file of files) {
        if(!file.endsWith(".js")) return;

        let props = require(`./utils/${file}`);
        let commandName = props.help.name;

        client.utils.set(commandName, props);

    };
})

process.on('unhandledRejection', error => {
    console.error('✅ Erreur d\'API détéctée : ' + error);

    const get_channel_guild = client.channels.cache.get(error.path.slice(10, 28)).guild

    const api_error_embed = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setDescription("🔺 **Il y a eu une erreur d'API sur le bot :**\n```js\n" + error + "```")
        .addField("🔺 Précisions :", "```\nNom : " + error.name + "\nMessage : " + error.message + "\nPath : " + error.path + "\nCode d'erreur : " + error.code + "\nMéthode : " + error.method + "```")
        .addField("🔺 Localisation :", "`Channel :` <#" + error.path.slice(10, 28) + ">, `ID :` " + error.path.slice(10, 28) + "\n`Serveur :` " + get_channel_guild.name + ", `ID :` " + get_channel_guild.id)
    client.channels.cache.get("734763152104751144").send("@here", api_error_embed)
});

////TOKEN DU BOT//////////
client.login('NzIzNTgyOTU0MjQ4NDcwNjI5.XuzvIw.CgU2Dxv5A3VRT05W8dw3J6tAdbQ')