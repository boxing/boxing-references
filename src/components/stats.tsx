/*eslint no-sequences: 0*/

import { song } from '../data';
import { Grid, Typography } from '@material-ui/core';

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

  const getPopularYears = (): stat => {
    return mapAndReduceFn(props.songs.map((i) => i.year));
  };

  const getPopularBoxers = (): stat => {
    return mapAndReduceFn(props.songs.map((i) => i.boxer?.name));
  };

  const popularYears: [string, number][] = getPopularYears();
  const popularBoxers: [string, number][] = getPopularBoxers();
  const stat = (arg: (string | number)[]) => `${arg[0]} (${arg[1]})`;

  return (
    <div>
      {props.songs.length > 0 && (
        <div>
          <Grid container justifyContent="center">
            <Typography variant="body2">
              Top referenced years: {stat(popularYears[0])},{' '}
              {stat(popularYears[1])}, {stat(popularYears[2])},{' '}
              {stat(popularYears[3])}, {stat(popularYears[4])}
            </Typography>
          </Grid>
          <Grid container justifyContent="center">
            <Typography variant="body2">
              Top referenced boxers: {stat(popularBoxers[0])},{' '}
              {stat(popularBoxers[1])}, {stat(popularBoxers[2])},{' '}
              {stat(popularBoxers[3])}, {stat(popularBoxers[4])}
            </Typography>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Stats;
