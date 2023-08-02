require('dotenv').config()
const axios = require('axios')
const  { SlashCommandBuilder } = require('discord.js')

let summoner = {
        name: '',
        level: '',
    }

let profile_url = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/aLLLx?api_key=${process.env.RIOT_KEY_API}`

axios.get(profile_url)
.then(res => {
    summoner.name = res.data.name
    summoner.level = res.data.summonerLevel
})



module.exports = {
    data: new SlashCommandBuilder()
        .setName('nickname')
        .setDescription('retorna informações sobre a conta do usuario !'),
    async execute(interaction) {
        await interaction.reply(`Nickname: ${summoner.name} | Nível: ${summoner.level}`)
    }
}