import SearchSongs, { isSearchType } from '../search-songs';
import { data, song } from '../../data';

test('isSearchType should return if value passed in as "boxer"', () => {
  expect(isSearchType('boxer')).toBe(true);
});

describe('filter', () => {
  test('should filter by artist', () => {
    expect(
      SearchSongs(data, 'snoop dogg', 'artist').length
    ).toBeGreaterThanOrEqual(1);
  });

  test('should filter by song', () => {
    expect(
      SearchSongs(data, 'Bitch Please', 'song').length
    ).toBeGreaterThanOrEqual(1);
  });

  test('should filter by lyrics', () => {
    expect(
      SearchSongs(data, 'Beat the beat', 'lyrics').length
    ).toBeGreaterThanOrEqual(1);
  });

  test('should filter by boxers', () => {
    expect(SearchSongs(data, 'liston', 'boxer').length).toBeGreaterThanOrEqual(
      1
    );
  });
});

describe('no filter', () => {
  describe('song', () => {
    test('should return results', () => {
      expect(SearchSongs(data, 'surf', 'all').length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('year', () => {
    test('should return results', () => {
      expect(SearchSongs(data, '1999', 'all').length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('artist', () => {
    test('should return results regardless of case', () => {
      expect(
        SearchSongs(data, 'Snoop Dogg', 'all').length
      ).toBeGreaterThanOrEqual(1);
    });
  });

  describe('boxer name', () => {
    test('should return results regardless of case', () => {
      expect(
        SearchSongs(data, 'mIke Tyson', 'all').length
      ).toBeGreaterThanOrEqual(1);
    });
  });
});
