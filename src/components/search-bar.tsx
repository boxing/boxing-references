import {
  Box,
  FormControl,
  InputLabel,
  Link,
  Select,
  TextField,
} from '@material-ui/core';
import GitHub from '@material-ui/icons/GitHub';
import Twitter from '@material-ui/icons/Twitter';
import styled from 'styled-components';
import { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { isSearchType, SearchType } from './search-songs';

const GithubLink = styled.span`
  position: relative;
  margin: 0 10px;
  top: 15px;
  svg {
    color: black;
  }
`;

const TwitterLink = styled.span`
  position: relative;
  margin: 0 10px;
  top: 15px;
  svg {
    color: rgba(29, 161, 242, 1);
  }
`;

function getLocationSearch(locationPathName: string): [string, SearchType] {
  const locationPathNameSplit = locationPathName.split('/');

  if (locationPathNameSplit.length === 3) {
    // basic search without type
    return [locationPathNameSplit[locationPathNameSplit.length - 1], 'all'];
  } else if (
    locationPathNameSplit.length === 4 &&
    isSearchType(locationPathNameSplit[locationPathNameSplit.length - 1])
  ) {
    // search with type
    return [
      locationPathNameSplit[locationPathNameSplit.length - 2],
      (locationPathNameSplit[locationPathNameSplit.length - 1] as SearchType) ??
        'all',
    ];
  }

  return ['', 'all'];
}

function SearchBar(props: { handleSearchParamChange: Function }) {
  const location = useLocation();
  const [locationSearchValue, locationSearchType] = getLocationSearch(
    location.pathname
  );
  const history = useHistory();
  const [search, setSearch] = useState<[string, SearchType]>(['', 'all']);

  if (locationSearchValue && search[0] !== locationSearchValue) {
    setSearch([locationSearchValue, locationSearchType]);
  }

  // on initial load we'll do a quick search
  useEffect(() => {
    props.handleSearchParamChange([locationSearchValue, locationSearchType]);
  }, []);

  useEffect(() => {
    if (search[0] === '') {
      document.title = `Boxing references in media`;
    } else {
      document.title = `Boxing references for "${search}"`;
    }
  }, [search]);

  const inputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    history.push(`/boxing-references/${e.target.value}/${locationSearchType}`);
    props.handleSearchParamChange([e.target.value, locationSearchType]);
    setSearch([e.target.value, locationSearchType]);
  };

  const handleChange = (
    e: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    history.push(`/boxing-references/${locationSearchValue}/${e.target.value}`);
    props.handleSearchParamChange([locationSearchValue, e.target.value]);
    setSearch([locationSearchValue, e.target.value as SearchType]);
  };

  return (
    <form noValidate autoComplete="off">
      <Box mr={1} display="inline">
        <TextField
          size="small"
          id="standard-basic"
          label="Search"
          spellCheck="false"
          value={search[0]}
          onChange={inputChange}
        />
      </Box>
      <Box display="inline">
        <FormControl size="small">
          <InputLabel>Type</InputLabel>
          <Select value={search[1]} native onChange={handleChange}>
            <option value="all">All</option>
            <option value="artist">Artist/Singer/Rapper</option>
            <option value="song">Song</option>
            <option value="year">Year</option>
            <option value="lyrics">Lyrics</option>
            <option value="boxer">Boxer</option>
          </Select>
        </FormControl>

        <GithubLink>
          <Link
            target="_blank"
            rel="noopener"
            href="https://github.com/boxing/boxing-references"
          >
            <GitHub />
          </Link>
        </GithubLink>

        <TwitterLink>
          <Link
            target="_blank"
            rel="noopener"
            href="https://twitter.com/Mike_DiDomizio"
          >
            <Twitter />
          </Link>
        </TwitterLink>
      </Box>
    </form>
  );
}

export default SearchBar;
