import {
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import Youtube from './youtube';
import { song } from '../data';
import styled from 'styled-components';
import Stats from './stats';
import SearchBar from './search-bar';
import SearchSongs, { SearchType } from './search-songs';

const Lyrics = styled.div`
  white-space: pre-wrap;
  font-style: italic;

  &::before,
  &&::after {
    content: '"';
  }
`;

function Search(props: { songs: song[] }) {
  const [searchParams, setSearchParams] = useState<string[]>(['', '']);
  const searchResults = SearchSongs(
    props.songs,
    searchParams[0],
    searchParams[1] as SearchType
  );

  const getBoxRecLink = (id: string = '0') =>
    `https://boxrec.com/en/proboxer/${id}`;
  const getBoxStatLink = (id: string = '0') => `https://boxstat.co/boxer/${id}`;

  return (
    <div className="search">
      <Grid container justifyContent="center">
        <SearchBar handleSearchParamChange={setSearchParams} />
      </Grid>

      <Grid container justifyContent="center">
        <Typography variant="body2">
          {searchResults.length} result
          {searchResults.length !== 1 && <span>s</span>}
        </Typography>
      </Grid>

      <Grid container justifyContent="center">
        <Stats songs={props.songs} />
      </Grid>

      {searchResults.length > 0 && (
        <TableContainer>
          <Table aria-label="Boxing references">
            <TableHead>
              <TableRow>
                <TableCell>Artist</TableCell>
                <TableCell>Song</TableCell>
                <TableCell>Singer/Rapper</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Boxer</TableCell>
                <TableCell>Links</TableCell>
                <TableCell>Lyrics</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((song, i) => (
                <TableRow key={i}>
                  <TableCell>{song.artist}</TableCell>
                  <TableCell>
                    <Link target="_blank" href={song.metadata.genius}>
                      {song.song}
                    </Link>
                  </TableCell>
                  <TableCell>{song.singer}</TableCell>
                  <TableCell>{song.year}</TableCell>
                  <TableCell>
                    {song.boxer?.name}
                    &nbsp;-{' '}
                    <Link
                      target="_blank"
                      href={getBoxRecLink(song.boxer?.boxrecId)}
                    >
                      BoxRec
                    </Link>
                    /
                    <Link
                      target="_blank"
                      href={getBoxStatLink(song.boxer?.boxstatId)}
                    >
                      BoxStat
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Lyrics>{song.lyrics}</Lyrics>
                  </TableCell>
                  <TableCell>
                    <Youtube
                      id={song.metadata.song.id}
                      source={song.metadata.song.id}
                      start={song.metadata.song.start}
                      end={song.metadata.song.end}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Search;
