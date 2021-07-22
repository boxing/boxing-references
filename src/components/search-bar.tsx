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
import { ChangeEvent, useEffect } from 'react';
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
  } else if (locationPathNameSplit.length === 4) {
    // search with type
    return [
      locationPathNameSplit[locationPathNameSplit.length - 2],
      isSearchType(locationPathNameSplit[locationPathNameSplit.length - 1])
        ? (locationPathNameSplit[
            locationPathNameSplit.length - 1
          ] as SearchType)
        : 'all',
    ];
  }

  return ['', 'all'];
}

/**
 * Search Bar that calls parent on change.  Updates the URL as search bar changed
 * @param props handleSearchParamChange is a callback to a parent component
 */
function SearchBar(props: { handleSearchParamChange: Function }) {
  const history = useHistory();
  const location = useLocation();
  const { handleSearchParamChange } = props;
  const [locationSearchValue, locationSearchType] = getLocationSearch(
    location.pathname
  );

  if (locationSearchValue === '') {
    document.title = `Boxing references in media`;
  } else {
    document.title = `Boxing references for "${locationSearchValue}"`;
  }

  // on initial load we'll do a quick search
  useEffect(() => {
    handleSearchParamChange([locationSearchValue, locationSearchType]);
  }, [handleSearchParamChange, locationSearchValue, locationSearchType]);

  /**
   * Fires when the textfield changes
   * @param e
   */
  const inputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // this will trigger the component to rebuild
    history.replace(
      `/boxing-references/${e.target.value}/${locationSearchType}`
    );
  };

  /**
   * Fires when the dropdown changes
   * @param e
   */
  const handleChange = (
    e: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    // this will trigger the component to rebuild
    history.replace(
      `/boxing-references/${locationSearchValue}/${e.target.value}`
    );
  };

  return (
    <form noValidate autoComplete="off">
      <Box mr={1} display="inline">
        <TextField
          size="small"
          id="standard-basic"
          label="Search"
          spellCheck="false"
          value={locationSearchValue}
          onChange={inputChange}
        />
      </Box>
      <Box display="inline">
        <FormControl size="small">
          <InputLabel>Type</InputLabel>
          <Select value={locationSearchType} native onChange={handleChange}>
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
