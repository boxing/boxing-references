import { song } from '../data';
import {
  DataGrid,
  getGridStringOperators,
  GridColDef,
  GridColTypeDef,
  GridFilterItem,
  GridLinkOperator,
  GridValueGetterParams,
} from '@material-ui/data-grid';
import { Boxer } from '../boxers';
import styled from 'styled-components';
import { InputAdornment, Link } from '@material-ui/core';
import Youtube from './youtube';

const Lyric = styled.span`
  ::before,
  ::after {
    content: '"';
  }
  font-style: italic;
  // breaks lyrics into multiple lines
  line-height: 20px;
  white-space: pre;
`;

function SearchResults(props: { results: song[] }) {
  const getBoxRecLink = (id: string = '0') =>
    `https://boxrec.com/en/proboxer/${id}`;
  const getBoxStatLink = (id: string = '0') => `https://boxstat.co/boxer/${id}`;

  const columns = [
    { field: 'artist', headerName: 'Artist', flex: 1 },
    { field: 'song', headerName: 'Song', flex: 1.5 },
    { field: 'singer', headerName: 'Singer/Rapper', flex: 1 },
    { field: 'year', headerName: 'Year', width: 105 },
    {
      field: 'boxer',
      headerName: 'Boxer',
      flex: 2,
      valueGetter: (params: GridValueGetterParams) => params.row.boxer.name,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <>
            {params.row.boxer.name}&nbsp;-&nbsp;
            <Link
              target="_blank"
              href={getBoxRecLink(params.row.boxer?.boxrecId)}
            >
              BoxRec
            </Link>
            /
            <Link
              target="_blank"
              href={getBoxStatLink(params.row.boxer?.boxstatId)}
            >
              BoxStat
            </Link>
          </>
        );
      },
    },
    {
      field: 'lyrics',
      headerName: 'Lyrics',
      flex: 3,
      renderCell: (params: GridValueGetterParams) => {
        return <Lyric>{params.row.lyrics}</Lyric>;
      },
    },
    {
      field: '',
      headerName: '',
      width: 75,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <Youtube
            id={params.row.metadata.song.id}
            source={params.row.metadata.song.id}
            start={params.row.metadata.song.start}
            end={params.row.metadata.song.end}
          />
        );
      },
    },
  ];

  // datagrid requires each row to have a unique id, therefore we iterate through the results and assign the index as an id
  const resultsWithID = props.results.map((song: song, index: number) => {
    return Object.assign(song, {
      id: index,
    });
  });

  return (
    <DataGrid
      sortModel={[
        {
          field: 'artist',
          sort: 'asc',
        },
      ]}
      rows={resultsWithID}
      columns={columns}
    />
  );
}

export default SearchResults;
