const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mangas')
        .setDescription('Exibe todos os mangas do Site!'),
    async execute(interaction) {
        let api = 'http://localhost:8080/manga'
        let res = await axios.get(api)
        
        let response =  res.data
        const embed= new EmbedBuilder()

        response.map(res => {
            embed.setTitle('Mangas')
            embed.setThumbnail('https://files.catbox.moe/agf65p.png')
            embed.setColor('#FFA500')
            embed.addFields({
                name: `${res.name}`,
                value: `**nota:** ${res.note} \n **tags:** ${res.tags} \n **descrição:** ${res.description}`
            })
            
        })

    await interaction.reply({embeds: [embed]})
    }
        
}
