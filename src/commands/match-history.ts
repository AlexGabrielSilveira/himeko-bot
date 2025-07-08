import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('match-history')
    .setDescription('Passe seu nickname#tagline, e veja seu histórico de partidas!')
    .addStringOption(option =>
        option
        .setName('match-history')
        .setDescription('coloque seu nickname e veja o match history!')
        .setRequired(true)
    );
export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('historico- to do')
}