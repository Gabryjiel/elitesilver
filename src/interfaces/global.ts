export type TournamentCard = {
    id: number,
    name: string,
    startDate: string,
    endDate: string,
    first: string,
    second: string,
    third: string
}

export type MatchCard = {
    bluePlayer: string,
    redPlayer: string,
    blueScore: string | number,
    redScore: string | number    
}

export type PlayerListItem = {
    name: string,
    rank: string,
    finished: string
}

export type MatchListItem = {
    bluePlayer: string,
    redPlayer: string,
    blueCS: number,
    redCS: number,
    blueScore: string | number,
    redScore: string | number
}