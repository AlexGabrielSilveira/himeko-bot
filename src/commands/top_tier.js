const  { SlashCommandBuilder } = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("top")
        .setDescription('Retorna os melhores jogadores do servidor BR1 !'),
async execute(interaction) {

    let tierList = await axios.get(`https://br1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?&api_key=${process.env.RIOT_KEY_API}`)
    const players = tierList.data.slice(0,9).map(player => {
        return player.summonerName
    })

    const embed = new EmbedBuilder()
        .setTitle("Top 10 | BR1 ")
        .setThumbnail("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/764bbd9c-6d80-481d-8136-96848f01e843/ddx6q22-c6936a5b-73d6-409d-b248-0b370494f90f.png/v1/fill/w_280,h_320/icon__challenger___season_9____lol_rank_by_dasgrischa_ddx6q22-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzIwIiwicGF0aCI6IlwvZlwvNzY0YmJkOWMtNmQ4MC00ODFkLTgxMzYtOTY4NDhmMDFlODQzXC9kZHg2cTIyLWM2OTM2YTViLTczZDYtNDA5ZC1iMjQ4LTBiMzcwNDk0ZjkwZi5wbmciLCJ3aWR0aCI6Ijw9MjgwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.Vppm1D6oqz65QRKw6Uo6CuGNhN7HzX1bV9fh0lpuMtE")
        .setColor("Random")
        tierList.data.slice(0,9).forEach(player => {
            embed.addFields({
                name: player.summonerName,
                value: `
                    win: ${player.wins}
                    losses : ${player.losses}
                    leaguePoints: ${player.leaguePoints}
                `
            })
        })

        await interaction.reply({ embeds: [embed] })             
    }
}

