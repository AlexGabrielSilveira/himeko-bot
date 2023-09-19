const  { SlashCommandBuilder } = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("top")
        .addStringOption(option =>
            option.setName('elo')
                .setDescription('Coloque o elo desejado !!')
                .setRequired(true))
        .setDescription('Digite o elo para ver os melhores jogadores !'),
async execute(interaction) {
    var elo = interaction.options.getString('elo')

    let tierList = await axios.get(`https://br1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/${elo.toUpperCase()}/I?&api_key=${process.env.RIOT_KEY_API}`)
    const players = tierList.data.slice(0,9).map(player => {
        return player.summonerName
    })

    const embed = new EmbedBuilder()
        .setTitle(`Top 10 ${elo} | BR1 `)
        .setThumbnail("https://th.bing.com/th/id/R.c81e94e9184ad3239f526f7a61342ad2?rik=MhpFHCC%2fybovpQ&pid=ImgRaw&r=0")
        .setColor("Random")
        tierList.data.slice(0,9).forEach(player => {
            embed.addFields({
                name: player.summonerName,
                value: `
                    win: ${player.wins}
                    losses : ${player.losses}
                    Rank: ${elo} ${player.rank}
                    leaguePoints: ${player.leaguePoints}
                `
            })
        })

        await interaction.reply({ embeds: [embed] })             
    }
}

