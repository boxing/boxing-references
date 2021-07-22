/*eslint no-sequences: 0*/

import { song } from '../data';
import { Box, Grid, Typography } from '@material-ui/core';
import BoxingReferencesLink from './boxing-references-link';

type stat = [string, number][];

function Stats(props: { songs: song[] }) {
  function mapAndReduceFn(mapFn: (string | number | undefined)[]): stat {
    const results: [string, number][] = mapFn.reduce((acc: any, curr: any) => {
      acc[curr] = ++acc[curr] || 1;
      return acc;
    }, {});

    return Object.entries(results).sort(
      (a: [string, any], b: [string, any]) => {
        return b[1] - a[1];
      }
    ) as unknown as [string, number][];
  }

  const getPopularYears = (): stat =>
    mapAndReduceFn(props.songs.map((i) => i.year));
  const getPopularBoxers = (): stat =>
    mapAndReduceFn(props.songs.map((i) => i.boxer?.name));
  const getPopularArtists = (): stat => {
    // takes both artists and the singer and creates an array and flattens
    const artistsAndSingers = props.songs
      .map((i) => {
        return [i.artist, i.singer];
      })
      .flat();
    return mapAndReduceFn(artistsAndSingers);
  };

  const popularYears: [string, number][] = getPopularYears();
  const popularBoxers: [string, number][] = getPopularBoxers();
  const popularArtists: [string, number][] = getPopularArtists();

  const stat = (obj: [string, number]) => `${obj[0]} (${obj[1]})`;

  return (
    <div>
      {props.songs.length > 0 && (
        <div>
          <Box mt={1} mb={1}>
            <Grid container justifyContent="center">
              <Typography variant="body2">
                Years:{' '}
                {popularYears.map((object: [string, number], i) => (
                  <BoxingReferencesLink key={i} url={object[0]}>
                    {(i ? ', ' : '') + stat(object)}
                  </BoxingReferencesLink>
                ))}
              </Typography>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container justifyContent="center">
              <Typography variant="body2">
                Boxers:{' '}
                {popularBoxers.map((object: [string, number], i) => (
                  <BoxingReferencesLink key={i} url={object[0]}>
                    {(i ? ', ' : '') + stat(object)}
                  </BoxingReferencesLink>
                ))}
              </Typography>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container justifyContent="center">
              <Typography variant="body2">
                Artist/Singer/Rapper:{' '}
                {popularArtists.map((object: [string, number], i) => (
                  <BoxingReferencesLink key={i} url={object[0]}>
                    {(i ? ', ' : '') + stat(object)}
                  </BoxingReferencesLink>
                ))}
              </Typography>
            </Grid>
          </Box>
        </div>
      )}
    </div>
  );
}

export default Stats;
