const axios = require('axios')
const { EmbedBuilder } = require('discord.js')



async function match_button(interaction) {

    let playerKda = { kills: [], deaths: [], assists: [] }
    let playerWards = { controlWardsPlaced: [], wardsPlaced: [], visionScore: [], pinksBought: [] }
    let playerChampion = { champLevel: [], championName: [], summonerName: []}

    let aliado = []
    let inimigo = []
    
    async function getMatchById(match_id) {
        let match_url = `https://americas.api.riotgames.com/lol/match/v5/matches/${match_id}?api_key=${process.env.RIOT_KEY_API}`
    
        let match_data = await axios.get(match_url)
        let match = match_data.data.info

        let gameType = match.gameType
        let gameDuration = Math.floor(match.gameDuration / 60)
        match.participants.map(participant => {
            // KDA

            let kills = participant.kills
            let deaths = participant.deaths
            let assists = participant.assists
            
            playerKda.kills.push(kills)
            playerKda.deaths.push(deaths)
            playerKda.assists.push(assists)

            // vision score / WARDS
            let controlWardsPlaced = participant.challenges.controlWardsPlaced
            let wardsPlaced = participant.wardsPlaced
            let visionScore = participant.visionScore
            let pink =  participant.visionWardsBoughtInGame

            playerWards.controlWardsPlaced.push(controlWardsPlaced)
            playerWards.wardsPlaced.push(wardsPlaced)
            playerWards.visionScore.push(visionScore)
            playerWards.pinksBought.push(pink)

            // champion
            let champLevel = participant.champLevel
            let championName = participant.championName
            let summonerName = participant.summonerName

            playerChampion.champLevel.push(champLevel)
            playerChampion.championName.push(championName)
            playerChampion.summonerName.push(summonerName)


            //win ?
            let winOrNot = participant.win
        })

        const embed = new EmbedBuilder()
            .setTitle(`${gameType ? 'Ranked: Solo/Duo' : 'Modo arena'}`)
            .setDescription(`Duração total da partida: ${gameDuration} Minutos`)
            .setColor('Random')
            .setThumbnail('https://i.pinimg.com/originals/30/0e/58/300e58c8416a68dcfcf1761501348243.jpg')
            playerChampion.championName.forEach((championName, i) => {
                const champLevel = playerChampion.champLevel[i]
                const summonerName = playerChampion.summonerName[i]

                if(i > 4) {
                    aliado.push(`**${championName.toString()}** \n **Nível:** ${champLevel} \n **Invocador:** ${summonerName} \n`)
                }else {
                    inimigo.push(`**${championName.toString()}** \n **Nível:** ${champLevel} \n **Invocador:** ${summonerName} \n`)
                }
            })

            embed.addFields({
                name: 'Time Aliado \n',
                value: aliado.join('\n'),
                inline: true
            })
            embed.addFields({
                name: 'Time Inimigo \n',
                value: inimigo.join('\n'),
                inline: true
            })



            await interaction.reply({ embeds: [embed]})
    }

    let [,match_id] = interaction.customId.split(':')
    getMatchById(match_id)

}

module.exports = { match_button }
