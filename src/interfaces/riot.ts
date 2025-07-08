export interface RiotAccountInterface {
    nickname: string
    tagline: string
}
export interface ProfileInfos {
    championId: number
    championName: string
    championLevel: number
    championPoints: number
}
export interface MatchInfos {
    gameDuration: number
    gameMode: string
    gameType: string
    teams: { bans: { championId: number }[] }[]
    gameVersion: string
    participants: ParticipantInfos[]
}
interface ParticipantInfos{
    champLevel: number
    championName: string
    kills: number
    assists: number
    deaths: number
    goldEarned: number
    lane: string
    riotIdGameName: string
    riotIdTagline: string
}