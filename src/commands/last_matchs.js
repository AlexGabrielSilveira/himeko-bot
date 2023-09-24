const axios = require('axios')
const  { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require('discord.js')
const { EmbedBuilder } = require('discord.js')

async function getHistoryBySummonerName(summoner) {
    let profile_url = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${process.env.RIOT_KEY_API}`
    let puuid = (await axios.get(profile_url)).data.puuid

    let matches =  `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${process.env.RIOT_KEY_API}`
    let last_matches = (await axios.get(matches)).data

    return last_matches

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('history')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Coloque seu nickname!')
                .setRequired(true))
        .setDescription('Retorna as ultimas 5 partidas do jogador !'),
    async execute(interaction) {
        let summoner_name = interaction.options.getString('username')
        let match_history = await getHistoryBySummonerName(summoner_name)

        let buttons = []

        match_history.forEach((match_id, i) => {

            const button = new ButtonBuilder()
                .setCustomId('match_button:' + match_id)
                .setLabel(`Partida #${i + 1}`)
                .setStyle(ButtonStyle.Primary)
            
            buttons.push(button)
        })


        const row = new ActionRowBuilder()
        .addComponents(...buttons)

        const embed = new EmbedBuilder()
            .setTitle('Escolha a partida 🔽')

        await interaction.reply( {embeds: [embed], components: [row]})
    }
}