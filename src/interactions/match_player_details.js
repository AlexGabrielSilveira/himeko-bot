const axios = require('axios')
const { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js')


async function match_player_details(interaction) {

    async function getMatchById(match_id) {
        let match_url = `https://americas.api.riotgames.com/lol/match/v5/matches/${match_id}?api_key=${process.env.RIOT_KEY_API}`
        
        let match_data = await axios.get(match_url)
        let match = match_data.data.info

        return match

    }
    function getPlayerData(match) {
        const playerValue = interaction.values[0]
        const res = match.participants.find(participant => participant.championName === playerValue)
        const player = {
            kda: {
                kills: res.kills,
                deaths: res.deaths,
                assists: res.assists,
                averagedKda: res.challenges.kda
            },
            total: {
                totalMinionsKilled: res.totalMinionsKilled,
                totalDamageDealtToChampions: res.totalDamageDealtToChampions,
                totalDamageTaken: res.totalDamageTaken
            },
            gold: {
                goldEarned: res.goldEarned,
                goldPerMinute: res.challenges.goldPerMinute
            },
            summoner: {
                summonerName: res.summonerName
            },
            champion: {
                championName: res.championName,
                champLevel: res.champLevel
            },
            visionScore: res.visionScore,        
            win: res.win
        }
        
        return player
    }
    
    const [, match_id ] = interaction.customId.split(':') 
    const match = await getMatchById(match_id)
    const player = getPlayerData(match)

    const embed = new EmbedBuilder()
        .setTitle(`${player.summoner.summonerName} | ${player.win ? 'Winner' : 'Loser'}`)
        .setThumbnail(`https://cdn.communitydragon.org/13.18.1/champion/${player.champion.championName}/square`)
        .setColor(`${player.win == true ? 'Green' : 'Red'}`)
        .addFields(
            {
                name: "KDA ⚔",
                value: `${player.kda.kills}/${player.kda.deaths}/${player.kda.assists}`
            },
            {
                name: 'KDA ratio',
                value: `${player.kda.averagedKda.toFixed(2)}`,
            },
            {
                name: 'Dano Causado 🔫',
                value: `${player.total.totalDamageDealtToChampions}`,
                inline: true
            },
            {
                name: 'Dano Recebido 🛡',
                value: `${player.total.totalDamageTaken}`,
                inline: true
            },
            {
                name: 'Ouro 💰',
                value: `Ouro Ganho: ${player.gold.goldEarned} \n Ouro p/ minuto: ${player.gold.goldPerMinute.toFixed(2)} `
            },
            {
                name: 'Placar De Visão <:a:1155589615831486495>',
                value: `${player.visionScore}`
            }
            
        )

    await interaction.reply({ embeds: [embed]})
}

module.exports = { match_player_details }
