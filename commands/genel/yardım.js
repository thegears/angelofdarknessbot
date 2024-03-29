const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require("../../config.json");
var prefix = config.prefix;
const Discord = require("discord.js");

//Here the command starts
module.exports = {
    //definition
        name: "yardım", //the name of the command 
        category: "bilgi", //the category this will be listed at, for the help cmd
        aliases: ["help"], //every parameter can be an alias or empty for no aliases
        cooldown: 5, //this will set it to a 5 second cooldown
        usage: "yardım [komut]", //this is for the help command for EACH cmd
        description: "Bütün komutları veya yazdığınız komutun bilgilerini yazar.", //the description of the command

        //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        var liste = ["spotify","netflix","minecraft","disney+","call_of_duty","hulu"];
        var yazi = "";
        liste.forEach(r => {
            yazi += prefix+"gen "+r+"\n"
        });
        message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(yazi));
    }
}

//function for getting all commands
function getAll(client,message){
const embed = new MessageEmbed() //defining the Embed
    .setColor("ORANGE")
    .setThumbnail(client.user.displayAvatarURL())
    .setTitle("YARDIM MENÜSÜ")
    const commands = (category) => { //finding all commands and listing them into a string with filter and map
        return client.commands.filter(cmd => cmd.category === category)
                .map(cmd => `\`${cmd.name}\``).join(", ")
    }
    //get the command infostring
    const info = client.categories.map(cat => stripIndents`**__${cat[0].toUpperCase() + cat.slice(1)}__**\n> ${commands(cat)}`)
    .reduce((string, category) => string + "\n" + category);
    //sending the embed with the description
    return message.channel.send(embed.setDescription(info))
}

//function for all commands
function getCMD(client,message,input){
    const embed = new MessageEmbed() //creating a new Embed
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase())) //getting the command by name/alias
    if(!cmd){ //if no cmd found return info no infos!
        return message.channel.send(embed.setColor("RED").setDescription(`Böyle bir komutum yok   **${input.toLowerCase()}**`));
    }
    if(cmd.name) embed.addField("**Komut ismi**", `\`${cmd.name}\``)
    if(cmd.description) embed.addField("**Açıklama**", `\`${cmd.description}\``);

    if(cmd.aliases) embed.addField("**Alternatif**", `\`${cmd.aliases.map(a => `${a}`).join("\`, \`")}\``)
    if(cmd.cooldown) embed.addField("**Gecikme**", `\`${cmd.cooldown} Saniye\``)
        else embed.addField("**Gecikme**", `\`1 Saniye\``)
    if(cmd.usage){
        embed.addField("**Kullanımı**", `\`${config.prefix}${cmd.usage}\``);
    }
    //send the new Embed
    return message.channel.send(embed.setColor("ORANGE"))
}
