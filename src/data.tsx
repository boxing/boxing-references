export interface song {
    song: string;
    year: number;
    artist: string;
    singer: string;
    lyrics: string;
    boxer: string;
    genre: Genre;
    metadata: {
        song: youtubeVideo;
    }
}

export interface youtubeVideo {
    source: "youtube";
    id: string;
    start: number;
    end: number;
}

type Genre = "rap"

export const data: song[] = [
    {
        song: "Surf Swag",
        year: 2009,
        singer: "Lil Wayne",
        artist: "Lil Wayne",
        lyrics: "Weezy beat the beat up like Sonny Liston",
        boxer: "Sonny Liston",
        genre: "rap",
        metadata: {
            song: {
                source: "youtube",
                id: 'eRRKlXbIqHY',
                start: 187,
                end: 194,
            }
        }
    },
    {
        song: "Bitch Please",
        year: 1999,
        artist: "Snoop Dogg",
        singer: 'Xzibit',
        lyrics: "Scrap like Mike Tyson",
        boxer: "Mike Tyson",
        genre: "rap",
        metadata: {
            song: {
                source: "youtube",
                id: 'y6_cpFMRVQM',
                start: 42,
                end: 50,
            }
        }
    }
]

