import axios, { AxiosResponse } from "axios"
import { CDN_COMMUNITY_DRAGON, RIOTGAMES_ACCOUNT, RIOTGAMES_AMERICAS_LOL, RIOTGAMES_LOL } from "../config/config"
import { MatchInfos, ProfileInfos, RiotAccountInterface } from "../interfaces/riot"

export async function getPlayerProfile({nickname, tagline}: RiotAccountInterface) {
    const res = await axios.get(`${RIOTGAMES_ACCOUNT}by-riot-id/${nickname.toLowerCase()}/${tagline.toLowerCase()}`, {
        headers: {
            'X-Riot-Token': process.env.RIOT_KEY_API
        }
    })
    const puuid: string = res.data.puuid;
    const profile = await axios.get(`${RIOTGAMES_LOL}summoner/v4/summoners/by-puuid/${puuid}`, {
        headers: {
            'X-Riot-Token': process.env.RIOT_KEY_API
        }
    })    
    const masteryPoints = await axios.get(`${RIOTGAMES_LOL}champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=3`, {
        headers: {
            'X-Riot-Token': process.env.RIOT_KEY_API
        }
    })

   const allChamps = await Promise.all(
        masteryPoints.data.map(async (champions: ProfileInfos) => {
            const champData = await axios.get(`${CDN_COMMUNITY_DRAGON}champion/${champions.championId}/data`)
            return {
                ...champions,
                championName: champData.data.name,
            }
        })
   )
    return {
        puuid: puuid,
        gameName: res.data.gameName,
        icon: profile.data.profileIconId,
        summonerLevel: profile.data.summonerLevel,
        championsMastery: allChamps
    }
}
export async function getMatchHistory(puuid: string) {
    const matchesId = await axios.get(`${RIOTGAMES_AMERICAS_LOL}match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`,{
        headers: {
            'X-Riot-Token': process.env.RIOT_KEY_API
        }
    })

    const matches = matchesId.data

    const matchesInfo = await Promise.all(
        matches.map(async (matchId: string) => {
            const match: AxiosResponse<{info: MatchInfos}> = await axios.get(`${RIOTGAMES_AMERICAS_LOL}match/v5/matches/${matchId}`, {
                headers: {
                'X-Riot-Token': process.env.RIOT_KEY_API
                }
            })
            return match.data.info;
        })
    )
    return matchesInfo;
}
