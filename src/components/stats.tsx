/*eslint no-sequences: 0*/

import { song } from '../data';
import { Grid } from '@material-ui/core';

function Stats(props: { songs: song[] }) {
  const getPopularYears = (): any[] => {
    const results = props.songs
      .map((i) => i.year)
      .reduce(
        (prev: any, curr: any) => ((prev[curr] = ++prev[curr] || 1), prev),
        {}
      );

    return Object.entries(results).sort(
      (a: [string, any], b: [string, any]) => {
        if (a[1] < b[1]) {
          return 1;
        }

        if (a[1] > b[1]) {
          return -1;
        }

        return 0;
      }
    );
  };

  const getPopularBoxers = (): any[] => {
    const results = props.songs
      .map((i) => i.boxer?.name)
      .reduce(
        (prev: any, curr: any) => ((prev[curr] = ++prev[curr] || 1), prev),
        {}
      );

    return Object.entries(results).sort(
      (a: [string, any], b: [string, any]) => {
        if (a[1] < b[1]) {
          return 1;
        }

        if (a[1] > b[1]) {
          return -1;
        }

        return 0;
      }
    );
  };

  const popularYears: any = getPopularYears();
  const popularBoxers: any = getPopularBoxers();
  const stat = (arg: any[]) => `${arg[0]} (${arg[1]})`;

  return (
    <div>
      <Grid container justifyContent="center">
        Top referenced years: {stat(popularYears[0])}, {stat(popularYears[1])},{' '}
        {stat(popularYears[2])}, {stat(popularYears[3])},{' '}
        {stat(popularYears[4])}
      </Grid>
      <Grid container justifyContent="center">
        Top referenced boxers: {stat(popularBoxers[0])},{' '}
        {stat(popularBoxers[1])}, {stat(popularBoxers[2])},{' '}
        {stat(popularBoxers[3])}, {stat(popularBoxers[4])}
      </Grid>
    </div>
  );
}

export default Stats;
