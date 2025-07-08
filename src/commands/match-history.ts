import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { getMatchHistory, getPlayerProfile } from "../services/riot-api";
import { createMatchEmbed } from "../services/match-history-card";

export const data = new SlashCommandBuilder()
    .setName('match-history')
    .setDescription('Passe seu nickname#tagline, e veja seu histórico de partidas!')
    .addStringOption(option =>
        option
        .setName('nickname')
        .setDescription('coloque seu nickname e veja o match history!')
        .setRequired(true)
    );
export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
        const nickname = interaction.options.getString('nickname')?.split('#')
        
        if(!nickname) {
            const embed = new EmbedBuilder()
            .setTitle('❌ Perfil Não encontrado!')
            .setColor('Red')
            .addFields({
                name: 'Riot ID incorreto',
                value: 'EX: nickname#tagline!'
            })
            return await interaction.editReply({ embeds: [embed]});
        }

        try {
            const profile = await getPlayerProfile({
                nickname: nickname[0],
                tagline: nickname[1]
            })
            
            const matches = await getMatchHistory(profile.puuid);
            if (!matches || matches.length === 0) {
                return await interaction.editReply('Nenhuma partida encontrada para este usuário.');
            }

            const firstMatchEmbed = createMatchEmbed(matches[0], {nickname: nickname[0], tagline: nickname[1]});

        await interaction.editReply({ embeds: [firstMatchEmbed] });
        }
        catch(err) {
            console.log(err)
                const embed = new EmbedBuilder()
                .setTitle('❌ Erro ao buscar dados')
                .setDescription('Algo deu errado ao tentar obter o histórico de partidas.')
                .setColor('Red');
            await interaction.editReply({ embeds: [embed] });
        } 
        
}