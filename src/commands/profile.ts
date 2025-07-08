import { ChatInputCommandInteraction, EmbedBuilder, embedLength, SlashCommandBuilder } from "discord.js";
import { getPlayerProfile, MasteryChampions } from "../services/riot-api";
import { LOL_CDN } from "../config/config";


export const data = new SlashCommandBuilder()
    .setName('profile')
    .setDescription('EX: nickname#tagline!')
    .addStringOption(option =>
        option
        .setName('nickname')
        .setDescription('coloque seu nickname!')
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
        
        const embed = new EmbedBuilder()
        .setColor("#5865F2") 
        .setThumbnail(`${LOL_CDN}img/profileicon/${profile.icon}.png`)
        .addFields(
        {
            name: "🧠 Nome de Invocador",
            value: `\`${profile.gameName}\``,
            inline: true,
        },
        {
            name: "📈 Nível da Conta",
            value: `\`${profile.summonerLevel}\``,
            inline: true
        },
        {
            name: "\n Campeões com mais Maestria!",
            value: "\n"
        },
        )
        profile.championsMastery.map((champ: MasteryChampions) => {
            embed
            .addFields({
                name: `\n 🏆 ${champ.championName}`,
                value: `🔹 Nível: ${champ.championLevel}\n 🧪 Pontos: ${champ.championPoints.toLocaleString()}`
            })
        })
        return await interaction.editReply({ embeds: [embed]});
    }
    catch(err) {
        console.log(err)
        const embed = new EmbedBuilder()
        .setTitle('❌ Perfil Não encontrado!')
        .setColor('Red')
        .addFields({
            name: 'Riot ID incorreto',
            value: 'EX: nickname#tagline!'
        })
        return await interaction.editReply({ embeds: [embed]});
    }   
}