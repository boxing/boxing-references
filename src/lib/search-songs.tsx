import { song } from '../data';

export type SearchType =
  | 'all'
  | 'artist'
  | 'song'
  | 'lyrics'
  | 'boxer'
  | 'year';
const searchType = ['all', 'artist', 'song', 'lyrics', 'boxer', 'year'];
export const isSearchType: (x: string) => boolean = (x: string) =>
  searchType.includes(x);

/**
 * Takes list of songs and searches through them and returns matches
 * @param songs list of all songs to search through
 * @param value string to use for matching
 * @param searchType type to match against
 * @return list of matched songs
 */
export default function SearchSongs(
  songs: song[],
  value: string,
  searchType: SearchType
): song[] {
  if (value === '') {
    return songs;
  }

  const includes = (songParam: string = '', val: string): boolean => {
    // takes the song value and removes all accents for additional searching
    const songParamWithNoAccents = songParam
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    return (
      songParam.toLowerCase().includes(val) ||
      songParamWithNoAccents.toLowerCase().includes(val)
    );
  };

  return songs.filter((song) => {
    const val: string = value.toLowerCase();

    if (
      (searchType === 'artist' &&
        (includes(song.artist, val) || includes(song.singer, val))) ||
      (searchType === 'song' && includes(song.song, val)) ||
      (searchType === 'lyrics' && includes(song.lyrics, val)) ||
      (searchType === 'boxer' && includes(song.boxer?.name, val)) ||
      (searchType === 'year' && includes('' + song.year, val))
    ) {
      return true;
    } else if (searchType === 'all') {
      if (includes(song.boxer?.name, val)) {
        return true;
      }

      if (includes(song.artist, val) || includes(song.singer, val)) {
        return true;
      }

      if (includes('' + song.year, val)) {
        return true;
      }

      if (includes(song.song, val)) {
        return true;
      }
    }

    return false;
  });
}
