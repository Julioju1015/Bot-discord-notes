const Discord = require('discord.js');

exports.run = (client, message, args) => {
   /* const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')
    const adapter = new FileSync('./db.json')
    const db = low(adapter)
    const member = message.mentions.users.first() || message.author
    const get_notes = db.get("notes_public").find({ user_id: member.id }).value()
    let notes = ''
    if (!get_notes) notes = ":x: Aucune notes public défini."
    else {
        let notes_msg = Object.values(get_notes)
        notes = notes_msg[1]
    }
    let profil = new Discord.MessageEmbed()
             .setTitle("📋 • __Notes public de " + member.tag + "__")
             .setDescription(notes)
             .setColor("#318CE7")
        message.channel.send(profil)*/
message.channel.send(":x: Cette commande est temporairement désactivée...")}

module.exports.help = {
    name: "viewnotepublic"
  };