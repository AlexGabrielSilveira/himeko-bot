require('dotenv').config()
const axios = require('axios')
const  { SlashCommandBuilder } = require('discord.js')

let last_matches = []

let puuid_url =  `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${process.env.PUUID}/ids?start=0&count=5&api_key=${process.env.RIOT_KEY_API}`


axios.get(puuid_url).then(res => {
    last_matches.push(res.data)

})

module.exports = {
    data: new SlashCommandBuilder()
        .setName('historico')
        .setDescription('Retorna as ultimas 5 partidas do jogador !'),
    async execute(interaction) {
        await interaction.reply('historico de partidas')
    }
}