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
            .addFields(
                {
                    name: 'Summoner Level',
                    value: `LV.${icon.summonerLevel}`
                },
                {
                    name: "Maestrias",
                    value: "🔽"
                }
            )
            for(let i = 0; i < 5; i++) {
                const mastery = champions_mastery[i]
                async function get_champion_name(championId) {
                    let save_champion_name = await axios.get(`https://cdn.communitydragon.org/13.18.1/champion/${championId}/data`)
                    return save_champion_name.data.name
                }
                
                let champions_points = mastery.championPoints.toString()
                let emojis;
                switch (mastery.championId) {
                    case 99: 
                        emojis = '<:a:1153826611746062438>'
                        break;
                    case 157:
                        emojis = '<:a:1153826752842432583>'
                        break; 
                    case 22:    
                        emojis = '<:a:1153826570427965530>'
                        break; 
                    case 246:
                        emojis = '<:a:1153826632176508988>'
                        break; 
                    case 245:
                        emojis = '<:a:1153826589029707776>'
                        break; 
                    case 103: 
                        emojis = '<:a:1153826506993324154>'
                        break; 
                    case 266:
                        emojis = '<:a:1154116477889298662>'
                        break;
                    case 166:
                        emojis = '<:a:1154116024338239528>'
                        break;
                    case 12:
                        emojis = '<:a:1154116480519118848>'
                        break;
                    case 32:
                        emojis = '<:a:1154116027584610326>'
                        break;
                    case 34:
                        emojis = '<:a:1154116030877155348>'
                        break;
                    case 1:
                        emojis = '<:a:1154116482867933225>'
                        break;
                    case 523:
                        emojis = '<:a:1154116034207416350>'
                        break;
                    case 136:
                        emojis = '<:a:1154116485598433373>'
                        break;
                    case 268:
                        emojis = '<:a:1154116487540375615>'
                        break;
                    case 423:
                        emojis = '<:a:1154116037810331749>'
                        break;
                    case 200:
                        emojis = '<:a:1154116489897594880>'
                        break;
                    case 53:
                        emojis = '<:a:1154116041857835038>'
                        break;
                    case 63:
                        emojis = '<:a:1154116492070232177>'
                        break;
                    case 201:
                        emojis = '<:a:1154116046656126996>'
                        break;
                    case 233:
                        emojis = '<:a:1154116049319501924>'
                        break;
                    case 51:
                        emojis = '<:a:1154116494012199054>'
                        break;
                    case 164:
                        emojis = '<:a:1154116051773169684>'
                        break;
                    case 69:
                        emojis = '<:a:1154116496210014258>'
                        break;
                    case 31:
                        emojis = '<:a:1154116055086673990>'
                        break;
                    case 42:
                        emojis = '<:a:1154116498818867302>'
                        break;
                    case 122:
                        emojis = '<:a:1154116059104821308>'
                        break;
                    case 131:
                        emojis = '<:a:1154116500689530890>'
                        break;
                    case 119:
                        emojis = '<:a:1154116063697571871>'
                        break;
                    case 60:
                        emojis = '<:a:1154116066163830874>'
                        break;
                    case 28:
                        emojis = '<:a:1154116503076090008>'
                        break;
                    case 81:
                        emojis = '<:a:1154116504590221343>'
                        break;
                    case 9:
                        emojis = '<:a:1154116070337171617>'
                        break;
                    case 114:
                        emojis = '<:a:1154116072857927841>'
                        break;
                    case 3:
                        emojis = '<:a:1154115981577310338>'
                        break;
                    case 86:
                        emojis = '<:a:1154115984840470600>'
                        break;
                    case 150:
                        emojis = '<:a:1154115986488819783>'
                        break;
                    case 79:
                        emojis = '<:a:1154115988636307476>'
                        break;
                    case 104:
                        emojis = '<:a:1154115990209187951>'
                        break;
                    case 887:
                        emojis = '<:a:1154115992792875048>'
                        break;
                    case 120:
                        emojis = '<:a:1154115994114064534>'
                        break;
                    case 74:
                        emojis = '<:a:1154115995770834944>'
                        break;
                    case 420:
                        emojis = '<:a:1154115998744592454>'
                        break;
                    case 39:
                        emojis = '<:a:1154116000300662884>'
                        break;
                    case 427:
                        emojis = '<:a:1154116002691428452>'
                        break;
                    case 40:
                        emojis = '<:a:1154116004239118336>'
                        break;
                    case 59:
                        emojis = '<:a:1154116006785056878>'
                        break;
                    case 24:
                        emojis = '<:a:1154116506343460946>'
                        break;
                    case 126:
                        emojis = '<:a:1154116571107709028>'
                        break;
                    case 202:
                        emojis = '<:a:1154116010228588664>'
                        break;
                    case 222:
                        emojis = '<:a:1154116509392711762>'
                        break;
                    case 145:
                        emojis = '<:a:1154116013563056248>'
                        break;
                    case 43:
                        emojis = '<:a:1154116018873057300>'
                        break;
                    case 30:
                        emojis = '<:a:1154116021020528680>'
                        break;
                    case 36:
                        emojis = '<:a:1154116513566040167>'
                        break;
                    case 38:
                        emojis = '<:a:1154120936904200212>'
                        break;
                    case 55:
                        emojis = '<:a:1154120938393194617>'
                        break;
                    case 10:
                        emojis = '<:a:1154120939747946546>'
                        break;
                    case 141:
                        emojis = '<:a:1154120941811544064>'
                        break;
                    case 85:
                        emojis = '<:a:1154120943329874101>'
                        break;
                    case 121:
                        emojis = '<:a:1154120945963909230>'
                        break;
                    case 203:
                        emojis = '<:a:1154120947566129182>'
                        break;
                    case 240:
                        emojis = '<:a:1154120950250491945>'
                        break;
                    case 96:
                        emojis = '<:a:1154120951982739586>'
                        break;
                    case 62:
                        emojis = '<:a:1154121003178414183>'
                        break;
                    case 117:
                        emojis = '<:a:1154121002121437194>'
                        break;
                    case 236:
                        emojis = '<:a:1154121000527609886>'
                        break;
                    case 127:
                        emojis = '<:a:1154120998002626570>'
                        break;
                    case 876:
                        emojis = '<:a:1154120996576575530>'
                        break;
                    case 89:
                        emojis = '<:a:1154120993716064416>'
                        break;
                    case 64:
                        emojis = '<:a:1154120991644069960>'
                        break;
                    case 7:
                        emojis = '<:a:1154120934672842853>'
                        break;
                    case 897:
                        emojis = '<:a:1154120954524475463>'
                        break;
                    case 54:
                        emojis = '<:a:1154121005774680167>'
                        break;
                    case 90:
                        emojis = '<:a:1154121007238479932>'
                        break;
                    case 57:
                        emojis = '<:a:1154121010048663562>'
                        break;
                    case 11:
                        emojis = '<:a:1154120989580460073>'
                        break;
                    case 21:
                        emojis = '<:a:1154121035998822523>'
                        break;
                    case 902:
                        emojis = '<:a:1154121037873680435>'
                        break;
                    case 82:
                        emojis = '<:a:1154121040134414366>'
                        break;
                    case 25:
                        emojis = '<:a:1154121041484984443>'
                        break;
                    case 950:
                        emojis = '<:a:1154121042789408778>'
                        break;
                    case 2:
                        emojis = '<:a:1154121099282481235>'
                        break;
                    case 20:
                        emojis = '<:a:1154121091485270046>'
                        break;
                    case 56:
                        emojis = '<:a:1154121089610424370>'
                        break;
                    case 895:
                        emojis = '<:a:1154121033515794522>'
                        break;
                    case 76:
                        emojis = '<:a:1154121051761025197>'
                        break;
                    case 518:
                        emojis = '<:a:1154121049860997273>'
                        break;
                    case 111:
                        emojis = '<:a:1154121047180853423>'
                        break;
                    case 75:
                        emojis = '<:a:1154121046111293530>'
                        break;
                    case 267:
                        emojis = '<:a:1154121044798476288>'
                        break;
                    case 61:
                        emojis = '<:a:1154121103455817730>'
                        break;
                    case 516:
                        emojis = '<:a:1154121106509271070>'
                        break;
                    case 80:
                        emojis = '<:a:1154121108258291742>'
                        break;
                    case 78:
                        emojis = '<:a:1154121110988787843>'
                        break;
                    case 555:
                        emojis = '<:a:1154121112645550110>'
                        break;
                    case 133:
                        emojis = '<:a:1154121116084867114>'
                        break;
                    case 497:
                        emojis = '<:a:1154121117506736178>'
                        break;
                    case 33:
                        emojis = '<:a:1154121086963818516>'
                        break;
                    case 421:
                        emojis = '<:a:1154121136481767475>'
                        break;
                    case 92:
                        emojis = '<:a:1154121133981970462>'
                        break;
                    case 107:
                        emojis = '<:a:1154121145621151784>'
                        break;
                    case 58:
                        emojis = '<:a:1154121143230419095>'
                        break;
                    case 888:
                        emojis = '<:a:1154121141200355448>'
                        break;
                    case 526:
                        emojis = '<:a:1154121138348236841>'
                        break;
                    case 101:
                        emojis = '<:a:1154124332738556045>'
                        break;
                    case 147:
                        emojis = '<:a:1154124334470791308>'
                        break;
                    case 68:
                        emojis = '<:a:1154124337079664811>'
                        break;
                    case 13:
                        emojis = '<:a:1154124338602184714>'
                        break;
                    case 360:
                        emojis = '<:a:1154124340439302164>'
                        break;
                    case 113:
                        emojis = '<:a:1154124343119446157>'
                        break;
                    case 235:
                        emojis = '<:a:1154124344759439480>'
                        break;
                    case 875:
                        emojis = '<:a:1154124347255029841>'
                        break;
                    case 35:
                        emojis = '<:a:1154124349050195968>'
                        break;
                    case 517:
                        emojis = '<:a:1154124386446614659>'
                        break;
                    case 16:
                        emojis = '<:a:1154124383678373888>'
                        break;
                    case 37:
                        emojis = '<:a:1154124382088740924>'
                        break;
                    case 72:
                        emojis = '<:a:1154124379563753472>'
                        break;
                    case 15:
                        emojis = '<:a:1154124377340784722>'
                        break;
                    case 14:
                        emojis = '<:a:1154124375692415068>'
                        break;
                    case 27:
                        emojis = '<:a:1154124374211825735>'
                        break;
                    case 102:
                        emojis = '<:a:1154124330230366268>'
                        break;
                    case 98:
                        emojis = '<:a:1154124351843618847>'
                        break;
                    case 134:
                        emojis = '<:a:1154124388044640326>'
                        break;
                    case 163:
                        emojis = '<:a:1154124390573809766>'
                        break;
                    case 91:
                        emojis = '<:a:1154124370369847336>'
                        break;
                    case 44:
                        emojis = '<:a:1154124372496371763>'
                        break;
                    case 17:
                        emojis = '<:a:1154124435939405937>'
                        break;
                    case 4:
                        emojis = '<:a:1154124437990416385>'
                        break;
                    case 412:
                        emojis = '<:a:1154124440356016210>'
                        break;
                    case 223:
                        emojis = '<:a:1154124441819815966>'
                        break;
                    case 18:
                        emojis = '<:a:1154124420336590898>'
                        break;
                    case 161:
                        emojis = '<:a:1154124457829486643>'
                        break;
                    case 45:
                        emojis = '<:a:1154124479488872498>'
                        break;
                    case 67:
                        emojis = '<:a:1154124476892586104>'
                        break;
                    case 110:
                        emojis = '<:a:1154124433905176586>'
                        break;
                    case 6:
                        emojis = '<:a:1154124431921266728>'
                        break;
                    case 77:
                        emojis = '<:a:1154124429102694492>'
                        break;
                    case 29:
                        emojis = '<:a:1154124426917462207>'
                        break;
                    case 23:
                        emojis = '<:a:1154124424799330424>'
                        break;
                    case 48:
                        emojis = '<:a:1154124422903513149>'
                        break;
                    case 771:
                        emojis = '<:a:1154124460337680395>'
                        break;
                    case 254:
                        emojis = '<:a:1154124462241894482>'
                        break;
                    case 234:
                        emojis = '<:a:1154124465265979513>'
                        break;
                    case 112:
                        emojis = '<:a:1154124467212132393>'
                        break;
                    case 8:
                        emojis = '<:a:1154124469544165507>'
                        break;
                    case 106:
                        emojis = '<:a:1154124471033135154>'
                        break;
                    case 19:
                        emojis = '<:a:1154124472899616808>'
                        break;
                    case 498:
                        emojis = '<:a:1154124475193896980>'
                        break;
                    case 5:
                        emojis = '<:a:1154124610258882611>'
                        break;
                    case 154:
                        emojis = '<:a:1154124621554139226>'
                        break;
                    case 350:
                        emojis = '<:a:1154124618773311600>'
                        break;
                    case 83:
                        emojis = '<:a:1154124616915243008>'
                        break;
                    case 777:
                        emojis = '<:a:1154124614369292389>'
                        break;
                    case 157:
                        emojis = '<:a:1154124612662206575>'
                        break;
                    case 429:
                        emojis = '<:a:1154117162559090769>'
                        break;
                    case 26:
                        emojis = '<:a:1154125402613227620>'
                        break;
                    case 115:
                        emojis = '<:a:1154125399933079572>'
                        break;
                    case 221:
                        emojis = '<:a:1154125397454245939>'
                        break;
                    case 238:
                        emojis = '<:a:1154125393633214515>'
                        break;
                    case 143:
                        emojis = '<:a:1154125406979498065>'
                        break;
                    case 142:
                        emojis = '<:a:1154125405507293205>'
                        break;
                    case 50:
                        emojis = '<:a:1153826736455299204>'
                        break;
                    case 84:
                        emojis = '<:a:1153826552392458270>'
                        break;
                }

                embed.addFields({
                    name: emojis + " " + await get_champion_name(mastery.championId),
                    value: `<:a:1154108219715760199> ${champions_points}`
                })
            }   
            await interaction.editReply({ embeds: [embed]})
    }
}
