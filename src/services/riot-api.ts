import axios, { all } from "axios"
import { CDN_COMMUNITY_DRAGON, LOL_CDN, RIOT_AMERICAS_API, RIOT_LOL_API } from "../config/config"

interface RiotAccountInterface {
    nickname: string
    tagline: string
}
export interface MasteryChampions {
    championId: number
    championName: string
    championLevel: number
    championPoints: number
}
export async function getPlayerProfile({nickname, tagline}: RiotAccountInterface) {
    const res = await axios.get(`${RIOT_AMERICAS_API}by-riot-id/${nickname.toLowerCase()}/${tagline.toLowerCase()}`, {
        headers: {
            'X-Riot-Token': process.env.RIOT_KEY_API
        }
    })
    const puuid = res.data.puuid;
    const profile = await axios.get(`${RIOT_LOL_API}summoner/v4/summoners/by-puuid/${puuid}`, {
        headers: {
            'X-Riot-Token': process.env.RIOT_KEY_API
        }
    })    
    const masteryPoints = await axios.get(`${RIOT_LOL_API}champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=3`, {
        headers: {
            'X-Riot-Token': process.env.RIOT_KEY_API
        }
    })

   const allChamps = await Promise.all(
        masteryPoints.data.map(async (champions: MasteryChampions) => {
            const champData = await axios.get(`${CDN_COMMUNITY_DRAGON}champion/${champions.championId}/data`)
            return {
                ...champions,
                championName: champData.data.name,
            }
        })
   )
    return {
        gameName: res.data.gameName,
        icon: profile.data.profileIconId,
        summonerLevel: profile.data.summonerLevel,
        championsMastery: allChamps
    }
}
