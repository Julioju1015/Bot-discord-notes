const Discord = require("discord.js");

module.exports = (client) => {


    console.log(`${client.user.username} est en ligne`);

    //client.user.setActivity("/help", {type: "LISTENING"});

    let statuses = [
        //`la Maintenance`
        `*invite`,
        `*info`,
        `*help`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "WATCHING"}); 

    }, 20000);

    let guildToSend = client.guilds.cache.find(g => g.id === "730507720742142052")
    let channelToSend = guildToSend.channels.cache.find(c => c.id === "734763152104751144")

    const okEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription("Le robot est en ligne <a:yes:734458982566985838>")
    channelToSend.send(okEmbed)

};