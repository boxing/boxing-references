/*eslint no-sequences: 0*/

import { song } from '../data';
import { Grid } from '@material-ui/core';

function Stats(props: { songs: song[] }) {
  const popularYears = (): any[] => {
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

  const popularBoxers = (): any[] => {
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

  return (
    <div>
      <Grid container justifyContent="center">
        Top referenced years: {popularYears()[0][0]}, {popularYears()[1][0]},{' '}
        {popularYears()[2][0]}
      </Grid>
      <Grid container justifyContent="center">
        Top referenced boxers: {popularBoxers()[0][0]}, {popularBoxers()[1][0]},{' '}
        {popularBoxers()[2][0]}
      </Grid>
    </div>
  );
}

export default Stats;
