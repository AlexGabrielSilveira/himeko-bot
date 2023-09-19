const axios = require('axios')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

async function getIconBySummonerName(summoner) {
    let profile_url = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${process.env.RIOT_KEY_API}`
    let puuid = (await axios.get(profile_url)).data.puuid

    let icon_profile = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.RIOT_KEY_API}`
    let get_icon_profile = (await axios.get(icon_profile)).data

    return get_icon_profile
    
}

async function getChampionsMastery(summoner) {
    let profile_url = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${process.env.RIOT_KEY_API}`
    let puuid = (await axios.get(profile_url)).data.puuid

    let mastery_path = `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${process.env.RIOT_KEY_API}`
    let get_mastery_champions = (await axios.get(mastery_path)).data

    return get_mastery_champions
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .addStringOption(option => 
            option.setName('nickname')
                .setDescription('coloque seu nickname!')
                .setRequired(true))
        .setDescription('Mostra as informações do seu perfil do LoL !'),
    async execute(interaction) {
        await interaction.deferReply()
        let summoner = interaction.options.getString('nickname')
        let icon = await getIconBySummonerName(summoner)
        let champions_mastery = await getChampionsMastery(summoner)

        const embed = new EmbedBuilder()
            .setTitle(`${icon.name}`)
            .setThumbnail(`https://ddragon.leagueoflegends.com/cdn/13.18.1/img/profileicon/${icon.profileIconId}.png`)
            .setColor('Random')
            .addFields({
                name: 'Summoner Level',
                value: `LV.${icon.summonerLevel}`
            })
            champions_mastery.slice(0,3).forEach(mastery => {

                let championsPoints = mastery.championPoints.toString()

                let emojis;

                switch(mastery.championId) {
                    case 99: 
                        emojis = '<:a:1153826611746062438>' // lux
                    break; 
                    
                    case 157:
                        emojis = '<:a:1153826752842432583>' //yasuo
                    break;
                    
                    case 22:    
                        emojis = '<:a:1153826570427965530>' //ashe
                    break;

                    case 246:
                        emojis = '<:a:1153826632176508988>' //qyianna
                    break;

                    case 245:
                        emojis = '<:a:1153826589029707776>' //ekko
                    break;

                    case 103: 
                        emojis = '<:a:1153826506993324154>' //ahri
                    break;

                    default:
                        emojis = '<:a:1153826752842432583>'
                }

                embed.addFields({
                    name: `Maestria: ${championsPoints}`,
                    inline: true,
                    value: emojis
                })
            })
            
        await interaction.editReply({ embeds: [embed]})
    }
}