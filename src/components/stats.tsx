/*eslint no-sequences: 0*/

import { song } from '../data';
import { Grid, Link, Typography } from '@material-ui/core';

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

  const stat = (obj: [string, number]) => `${obj[0]} (${obj[1]})`;

  return (
    <div>
      {props.songs.length > 0 && (
        <div>
          <Grid container justifyContent="center">
            <Typography variant="body2">
              Referenced years:{' '}
              {popularYears.map((object: [string, number], i) => (
                <Link key={i} href={'/boxing-references/' + object[0]}>
                  {(i ? ', ' : '') + stat(object)}
                </Link>
              ))}
            </Typography>
          </Grid>
          <Grid container justifyContent="center">
            <Typography variant="body2">
              Referenced boxers:{' '}
              {popularBoxers.map((object: [string, number], i) => (
                <Link key={i} href={'/boxing-references/' + object[0]}>
                  {(i ? ', ' : '') + stat(object)}
                </Link>
              ))}
            </Typography>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Stats;
