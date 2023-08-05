const opggScrape = require('better-opgg-scraper')
const  { SlashCommandBuilder } = require('discord.js')
const { EmbedBuilder } = require('discord.js')


async function getProfileInfo(nickname) {
    let res = await opggScrape.getStats(nickname, 'br1')
    return res
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
        await interaction.deferReply()
        let nickname = interaction.options.getString("nickname")
        let profile = await getProfileInfo(nickname)

        const embed = new EmbedBuilder()
            .setTitle(profile.SummonerName)
            .setThumbnail(profile.SummonerIcon)
            .setColor("Random")
            .addFields({
                name: "ELO",
                value: profile.Rank
            })
            .addFields({
                name: "PDLs",
                value: profile.LP
            })
            .addFields({
                name: 'WinRate',
                value: profile.WinRate
            })
        await interaction.editReply({ embeds: [embed] })
    }

}

