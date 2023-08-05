const opggScrape = require('better-opgg-scraper')
const  { SlashCommandBuilder } = require('discord.js')

function getProfileInfo(nickname) {
    opggScrape.getStats(nickname, 'br1')
        .then(stats => console.log(stats))   
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .addStringOption(option =>
            option.setName('nickname')
                .setDescription('Coloque seu nickname!')
                .setRequired(true)
                )
        .setDescription('Retorna as infos sobre seu perfil !'),
    async execute(interaction) {
        let nickname = interaction.options.getString("nickname")
        await getProfileInfo(nickname)

        await interaction.reply('oi')
    }

}

