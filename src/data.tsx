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
      'Weezy beat the beat up like Sonny Liston\n' +
      'Redbone do me good then her friend assist her',
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
      'Xzibit ready to Scrap like Mike Tyson with his license back\n' +
      '9 to 5 minimum wage? What type of life is that?',
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
      'Got skills, got stamina\n' +
      'Got hands of stone like the champ from Panama',
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
      'New York, New York, so nice, got named twice, and...\n' +
      "I'm harassing' punks like Mike Tyson",
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
      "And I’ll break, connive, it's worse\n" +
      "Than Pernell Whitaker fuckin' up Chavez",
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
    song: 'Rose Clique',
    year: 2012,
    artist: 'Nipsey Hussle',
    singer: 'Nipsey Hussle',
    lyrics:
      'In other words, life is just a fight against your disbeliefs\n' +
      "That's why I'm screamin' I'm the greatest of all time like Young Ali\n" +
      'Play Mohammad to these false prophets in this industry',
    boxer: boxers.get('Muhammad Ali'),
    genre: 'rap',
    metadata: {
      song: {
        source: 'youtube',
        id: 'RdynzruivVs',
        start: 139,
        end: 148,
      },
      genius: 'https://genius.com/Nipsey-hussle-rose-clique-lyrics',
    },
  },
  {
    song: 'Shot Caller (Remix) ft. Diddy, Rick Ross, Charlie Rock',
    year: 2012,
    artist: 'French Montana',
    singer: 'Rick Ross',
    lyrics:
      "We on the floor, Pacquiao the world's greatest\n" +
      'Boxing niggas all I ever did was mob and weave\n' +
      "Now the crib eight mil, that's on everything",
    boxer: boxers.get('Manny Pacquiao'),
    genre: 'rap',
    metadata: {
      song: {
        source: 'youtube',
        id: 'IlrW8_WIy7g',
        start: 161,
        end: 169,
      },
      genius: 'https://genius.com/601528',
    },
  },
  {
    song: 'The M.G.M.',
    year: 1997,
    artist: 'Ghostface Killah & Raekwon',
    singer: 'Ghostface Killah/Raekwon',
    lyrics:
      'Now I remember, he from Bear Mountain\n' +
      'He and Mitch Greene shot the fair one near the water fountain',
    boxer: boxers.get('Mitch Green'),
    genre: 'rap',
    metadata: {
      song: {
        source: 'youtube',
        id: 'NLGi3l2Tujw',
        start: 74,
        end: 78,
      },
      genius: 'https://genius.com/721238',
    },
  },
  {
    song: 'The M.G.M.',
    year: 1997,
    artist: 'Ghostface Killah & Raekwon',
    singer: 'Ghostface Killah',
    lyrics:
      'Seventh round, Chavez bleeding from his right ear\n' +
      'Yo, keep your eye on that same nigga from right here',
    boxer: boxers.get('Julio César Chávez'),
    genre: 'rap',
    metadata: {
      song: {
        source: 'youtube',
        id: 'NLGi3l2Tujw',
        start: 78,
        end: 83,
      },
      genius: 'https://genius.com/1390638',
    },
  },
  {
    song: 'The M.G.M.',
    year: 1997,
    artist: 'Ghostface Killah & Raekwon',
    singer: 'Raekwon/Ghostface',
    lyrics:
      "Tenth round, Chavez tearing 'em down\n" +
      'Sweet Pea, get ya shit off\n' +
      "It's like blacks against the Germans, getting hit off",
    boxer: boxers.get('Julio César Chávez'),
    genre: 'rap',
    metadata: {
      song: {
        source: 'youtube',
        id: 'NLGi3l2Tujw',
        start: 98,
        end: 103,
      },
      genius: 'https://genius.com/2528240',
    },
  },
  {
    song: 'The M.G.M.',
    year: 1997,
    artist: 'Ghostface Killah & Raekwon',
    singer: 'Ghostface Killah/Raekwon',
    lyrics:
      "Tenth round, Chavez tearing 'em down\n" +
      'Sweet Pea, get ya shit off\n' +
      "It's like blacks against the Germans, getting hit off",
    boxer: boxers.get('Pernell Whitaker'),
    genre: 'rap',
    metadata: {
      song: {
        source: 'youtube',
        id: 'NLGi3l2Tujw',
        start: 98,
        end: 103,
      },
      genius: 'https://genius.com/2528240',
    },
  },
  {
    song: 'The M.G.M.',
    year: 1997,
    artist: 'Ghostface Killah & Raekwon',
    singer: 'Raekwon/Ghostface Killah',
    lyrics:
      'Yo, they wound up stopping the fight\n' +
      'Steels took a point away from Chavez\n' +
      'Rematch scheduled on October 9th',
    boxer: boxers.get('Julio César Chávez'),
    genre: 'rap',
    metadata: {
      song: {
        source: 'youtube',
        id: 'NLGi3l2Tujw',
        start: 113,
        end: 118,
      },
      genius: 'https://genius.com/Wu-tang-clan-the-mgm-lyrics',
    },
  },
  {
    song: 'Platinum Plus ft. Big Daddy Kane',
    year: 2000,
    artist: 'Big L',
    singer: 'Big Daddy Kane',
    lyrics:
      'You tryin to go places, chasin Oasis\n' +
      'About nothin gettin low wages\n' +
      'Drink Hennessy with no chasers\n' +
      "Right hook is like Joe Frasier's, I'm the bodacious",
    boxer: boxers.get('Joe Frazier'),
    genre: 'rap',
    metadata: {
      song: {
        source: 'youtube',
        id: '3gNzypRw9K4',
        start: 112,
        end: 130,
      },
      genius: 'https://genius.com/Big-l-platinum-plus-lyrics',
    },
  },
  {
    song: "You Won't See Me Tonight ft. Aaliyah",
    year: 2000,
    artist: 'Nas',
    singer: 'Nas',
    lyrics:
      "Can't forget how I met you;\n" +
      'You thought I was a boxer Prince Naseem\n' +
      "But I'm the mobster",
    boxer: boxers.get('Naseem Hamed'),
    genre: 'rap',
    metadata: {
      song: {
        source: 'youtube',
        id: 'RL6g1dIDgmo',
        start: 31,
        end: 35,
      },
      genius: 'https://genius.com/2155008',
    },
  },
  {
    song: 'Light Up ft. Jay-Z',
    year: 2010,
    artist: 'Drake',
    singer: 'Jay-Z',
    lyrics:
      'I just landed in that G450\n' +
      "Caught the Mayweather fight 'cause the satellite was crispy, uhh",
    boxer: boxers.get('Floyd Mayweather Jr.'),
    genre: 'rap',
    metadata: {
      song: {
        source: 'youtube',
        id: 'ObUzFn2HyyE',
        start: 164,
        end: 171,
      },
      genius: 'https://genius.com/17720',
    },
  },
];
