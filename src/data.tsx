import { Boxer, boxers } from './boxers';

export interface song {
  song: string;
  year: number;
  artist: string;
  singer: string;
  lyrics: string;
  boxer: Boxer | undefined;
  genre: Genre;
  metadata: {
    song: youtubeVideo;
    genius: string;
  };
}

export interface youtubeVideo {
  source: 'youtube';
  id: string;
  start: number;
  end: number;
}

type Genre = 'rap';

export const data: song[] = [
  {
    song: 'Surf Swag',
    year: 2009,
    singer: 'Lil Wayne',
    artist: 'Lil Wayne',
    lyrics:
      'Weezy beat the beat up like Sonny Liston\nRedbone do me good then her friend assist her',
    boxer: boxers.get('Sonny Liston'),
    genre: 'rap',
    metadata: {
      song: {
        source: 'youtube',
        id: 'eRRKlXbIqHY',
        start: 187,
        end: 194,
      },
      genius: 'https://genius.com/13380',
    },
  },
  {
    song: 'Bitch Please',
    year: 1999,
    artist: 'Snoop Dogg',
    singer: 'Xzibit',
    lyrics:
      'Xzibit ready to Scrap like Mike Tyson with his license back\n9 to 5 minimum wage? What type of life is that?',
    boxer: boxers.get('Mike Tyson'),
    genre: 'rap',
    metadata: {
      song: {
        source: 'youtube',
        id: 'y6_cpFMRVQM',
        start: 42,
        end: 50,
      },
      genius: 'https://genius.com/21430388',
    },
  },
  {
    song: 'Young Man Rumble',
    year: 1994,
    artist: 'Max and Sam',
    singer: 'Max Kellerman',
    lyrics:
      'Got skills, got stamina\nGot hands of stone like the champ from Panama',
    boxer: boxers.get('Roberto Duran'),
    genre: 'rap',
    metadata: {
      song: {
        source: 'youtube',
        id: 'WF0DntqwMKg',
        start: 77,
        end: 82,
      },
      genius: 'https://genius.com/16338821',
    },
  },
  {
    song: 'Young Man Rumble',
    year: 1994,
    artist: 'Max and Sam',
    singer: 'Max Kellerman',
    lyrics:
      "New York, New York, so nice, got named twice, and...\nI'm harassing' punks like Mike Tyson",
    boxer: boxers.get('Mike Tyson'),
    genre: 'rap',
    metadata: {
      song: {
        source: 'youtube',
        id: 'WF0DntqwMKg',
        start: 102,
        end: 107,
      },
      genius: 'https://genius.com/Max-and-sam-young-man-rumble-lyrics',
    },
  },
  {
    song: 'Young Man Rumble',
    year: 1994,
    artist: 'Max and Sam',
    singer: 'Max Kellerman',
    lyrics:
      "And I’ll break, connive, it's worse\nThan Pernell Whitaker fuckin' up Chavez",
    boxer: boxers.get('Pernell Whitaker'),
    genre: 'rap',
    metadata: {
      song: {
        source: 'youtube',
        id: 'WF0DntqwMKg',
        start: 107,
        end: 112,
      },
      genius: 'https://genius.com/16338821',
    },
  },
  {
    song: 'Young Man Rumble',
    year: 1994,
    artist: 'Max and Sam',
    singer: 'Max Kellerman',
    lyrics:
      "And I’ll break, connive, it's worse\nThan Pernell Whitaker fuckin' up Chavez",
    boxer: boxers.get('Julio César Chávez'),
    genre: 'rap',
    metadata: {
      song: {
        source: 'youtube',
        id: 'WF0DntqwMKg',
        start: 107,
        end: 112,
      },
      genius: 'https://genius.com/16338821',
    },
  },
];
