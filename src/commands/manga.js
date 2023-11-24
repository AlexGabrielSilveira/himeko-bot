const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const axios = require('axios')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('Manga')
        .setDescription('Procure pelo nome do manga!'),
    async execute(interaction) {
        // to do
    }
}
