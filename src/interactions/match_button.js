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
            playerKda.kills.push(participant.kills)
            playerKda.deaths.push(participant.deaths)
            playerKda.assists.push(participant.assists)

            // vision score / WARDS
            playerWards.controlWardsPlaced.push(participant.challenges.controlWardsPlaced)
            playerWards.wardsPlaced.push(participant.wardsPlaced)
            playerWards.visionScore.push(participant.visionScore)
            playerWards.pinksBought.push(participant.visionWardsBoughtInGame)

            // champion
            playerChampion.champLevel.push(participant.champLevel)
            playerChampion.championName.push(participant.championName)
            playerChampion.summonerName.push(participant.summonerName)


            //win ?
            win = participant.win
        })

        const embed = new EmbedBuilder()
            .setTitle(`${gameType ? 'Ranked: Solo/Duo' : 'Modo arena'}`)
            .setDescription(`Duração total da partida: ${gameDuration} Minutos`)
            .setColor('Random')
            .setThumbnail('https://th.bing.com/th/id/R.c81e94e9184ad3239f526f7a61342ad2?rik=MhpFHCC%2fybovpQ&pid=ImgRaw&r=0')
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
                name: "Time aliado",
                value: aliado.join('\n'),
                inline: true
            })
            embed.addFields({
                name: "Time inimigo",
                value: inimigo.join('\n'),
                inline: true
            })



            await interaction.reply({ embeds: [embed]})
    }

    let [,match_id] = interaction.customId.split(':')
    getMatchById(match_id)

}

module.exports = { match_button }
