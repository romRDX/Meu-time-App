export interface Country {
    code: string,
    flag: string,
    name: string,
}

export interface Season {
    coverage: {
        fixtures: {
            events: boolean,
            lineups: boolean,
            statistics_fixtures: boolean,
            statistics_players: boolean,
        },
        inujires: boolean,
        odds: boolean,
        players: boolean,
        predictions: boolean,
        standings: boolean,
        top_assists: boolean,
        top_cards: boolean,
        top_scores: boolean,
    },
    current: boolean,
    end: string,
    start: string,
    year: number
}

export interface League {
    id: number,
    logo: string,
    name: string,
    type: string,
}

export interface Team {
    team: {
        code: string,
        country: string,
        founded: number,
        id: number,
        logo: string,
        name: string,
        national: boolean,
    },
    venue: {
        address: string,
        capacity: number,
        city: string,
        id: number,
        image: string,
        name: string,
        surface: string,
    }
}