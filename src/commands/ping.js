const  { SlashCommandBuilder } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('bomdia')
        .setDescription('AFIRMATIVO CAPITAO BROXA! '),
    async execute(interaction) {
        await interaction.reply('AFIRMATIVO CAPITAO BROXA!')
    }
}