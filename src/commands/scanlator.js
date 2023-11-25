const { EmbedBuilder, SlashCommandBuilder, embedLength } = require('discord.js')
const axios = require('axios')

const commands = ["profile", "top", "history"]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('scanlators')
        .setDescription('Exibe todos os grupos do Site.'),
    async execute(interaction) {
        try {
            let api = process.env.LOCALHOST + '/scanlator'
            let res = await axios.get(api)
            let data = await res.data

            const embed = new EmbedBuilder()
            data.map(res => {
                embed.setTitle('Scanlators')
                embed.setThumbnail('https://files.catbox.moe/agf65p.png')
                embed.setColor('#FFA500')
                embed.addFields({
                    name: `${res.name}`,
                    value: `${res.url}`
                })
                
            })     
            await interaction.reply({embeds: [embed]})  
        }catch(err) {
            const embed = new EmbedBuilder()
                .setTitle('#Erro#')
                .setColor('#d03939')
                .setThumbnail('https://files.catbox.moe/agf65p.png')
                .addFields({
                    name: "Comandos 🔽",
                    value: `**Nosso servidor esta offline no momento, tente esses comandos:** \n ${commands}`
                })
            await interaction.reply({embeds: [embed]})
        }

    }
}
