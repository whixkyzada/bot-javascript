const Guild = require('../../database/Schemas/Guild');
const User = require('../../database/Schemas/User');

const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);

module.exports = async(client, message) => {
    try {
      Guild.findOne({_id: message.guild.id}, async function (err, server) {
        User.findOne({_id: message.author.id}, async function (err, user) {
        if(message.author.bot == true) return;

        if(server){
        if(user){
        var prefix;
        prefix = server.prefix;

        if(message.content.match(GetMention(client.user.id))){
            message.channel.send(
                `Olá ${message.author}, meu prefixo nesse servidor é **${prefix}**.`
            );
        }

        let xp = user.Exp.xp;
        let level = user.Exp.level;
        let nextLevel = user.Exp.nextLevel * level;

        let xpGive = Math.floor(Math.random() * 5) + 1;

        await User.findOneAndUpdate({_id: message.author.id}, {$set: {'Exp.xp': xp + xpGive}})

        if(xp >= nextLevel) {
          await User.findOneAndUpdate({_id: message.author.id}, {$set: {'Exp.xp': 0, 'Exp.level': level + 1}})

          message.quote(`${message.author}, você acaba de subir para o level **${level + 1}**.`)
          message.react("⬆️")
        }

        if(message.content.indexOf(prefix) !== 0) return;
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);
        let cmdFile = 
        client.commands.get(cmd.slice(prefix.length)) || 
        client.commands.get(client.aliases.get(cmd.slice(prefix.length)));

        if (cmdFile) {
            return cmdFile.run(client, message, args);
        }
      } else {
        User.create({_id: message.author.id})
      }
    } else {
        Guild.create({_id: message.guild.id})
    }
      });
    });
  } catch(err) {
    if(err) console.error(err);
  }
};
