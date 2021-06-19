const Guild = require("../../database/Schemas/Guild");
const Discord = require("discord.js");

exports.run = (client, message, args) => {
    Guild.findOne({ _id: message.guild.id }, async function (err, server) {

        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${message.author}, você precisa da permissão de **Gerenciar Servidor** para executar esse comando.`)

    if(args[0] == "canal") {

        let canal = message.mentions.channels.first() || message.guild.channels.cache.find((x) => x.id == args[1])

        if(!canal) {
            return message.quote(`${message.author}, você não inseriu o ID/não mencionou nenhum canal para eu setar como canal de **byebye**.`)
        } else if(canal.id === server.byebye.channel) {
            return message.quote(`${message.author}, o canal inserido é o mesmo setado atualmente.`)
        } else {
            message.quote(`${message.author}, canal **<#${canal.id}>** setado como canal de **byebye** com sucesso.`)
            await Guild.findOneAndUpdate({_id: message.guild.id}, {$set: {'byebye.channel': canal.id }})
        }
        return;
    }

    if(args[0] == "on") {

        if(server.byebye.status) {
            return message.quote(`${message.author}, o sistema já se encontra ativado.`)
        } else {
            message.quote(`${message.author}, sistema de byebye ativado com sucesso.`)
            await Guild.findOneAndUpdate({_id: message.guild.id}, {$set: {'byebye.status': true}})

        }
        return;
    }

    if(args[0] == "off") {

        if(!server.byebye.status) {
            return message.quote(`${message.author}, o sistema já se encontra desativado.`)
        } else {
            message.quote(`${message.author}, sistema de byebye desativado com sucesso.`)
            await Guild.findOneAndUpdate({_id: message.guild.id}, {$set: {'byebye.status': false}})

        }
        return;
    }

    if(args[0] == "msg") {
    
        let msg = args.slice(1).join (" ");

        if(!msg) {
            return message.quote(`${message.author}, você não inseriu nenhuma mensagem.`)
        } else if(msg.length > 100) {
            return message.quote(`${message.author}, a mensagem inserida é muito grande, o limite de caracteres é de **100**.`)
        } else if(msg == server.byebye.msg) {
            return message.quote(`${message.author}, a mensagem inserida é a mesma setada atualmente.`)
        } else {
            message.quote(`${message.author}, a mensagem de byebye do servidor foi alterada para\n\`\`\`diff\n- ${msg}\`\`\``)
            await Guild.findOneAndUpdate({_id: message.guild.id}, {$set: {'byebye.msg': msg }})
        }
    }

    let INFO = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name} - Sistema de ByeBye`, message.guild.iconURL({dynamic: true}))
    .setDescription(`> **{member}** - menciona o membro\n> **{name}** - coloca o nome do membro\n> **{total}** - pega o total de membros na guild\n> **{guildName}** - pega o nome do servidor`)
    .addFields({
        name: "Canal Setado",
        value: server.byebye.channel == "null" ? "Nenhum Canal" : `<#${server.byebye.channel}>`
    },
    {
        name: "Mensagem Setada",
        value: server.byebye.msg == "null" ? "Nenhuma Mensagem" : `\`\`\`diff\n- ${server.byebye.msg}\`\`\``
    },
    {
        name: "Status do Sistema",
        value: `No momento o sistema se encontra **${server.byebye.status ? "ativado" : "desativado"}**.`
    }
    )
    .setColor(process.env.EMBED_COLOR)
    .setFooter(`Comando requisitado por ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
    .setThumbnail("https://cdn.discordapp.com/attachments/822286227394396190/822587519878037514/2757.png")
    .setTimestamp()

    message.quote(INFO)


 });
};

exports.help = {
    name: "byebye",
    aliases: [],
}