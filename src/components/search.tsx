import {
    Box,
    FormControl,
    InputLabel,
    Link,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import {ChangeEvent, useEffect, useState} from "react";
import Youtube from "./youtube";
import {song} from "../data";
import styled from 'styled-components';
import GitHub from '@material-ui/icons/GitHub';
import Twitter from '@material-ui/icons/Twitter';
import {useHistory, useLocation} from "react-router-dom";

const Lyrics = styled.div`
    white-space: pre-wrap;
    font-style: italic;
 
    &::before, &&::after {
        content: '"';
    }
`;

const GithubLink = styled.span`
    position: relative;
    margin: 0 10px;
    top: 10px;
    svg {
        color: black;    
    }
`;

const TwitterLink = styled.span`
    position: relative;
    margin: 0 10px;
    top: 10px;
    svg {
        color: rgba(29,161,242,1.00);
    }
`

type SearchType = "all" | "artist" | "song" | "lyrics" | "boxer";

function SearchSongs(songs: song[], value: string, searchType: SearchType): song[] {
    if (value === '') {
        return songs;
    }

    const includes = (songParam: string, val: string): boolean => {
        // takes the song value and removes all accents for additional searching
        const songParamWithNoAccents = songParam.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return songParam.toLowerCase().includes(val) || songParamWithNoAccents.toLowerCase().includes(val);
    }

    return songs.filter(song => {
        const val: string = value.toLowerCase();

        if (
            (searchType === "artist" && (includes(song.artist, val) || includes(song.singer, val)))
            || (searchType === "song" && includes(song.song, val))
            || (searchType === "lyrics" && includes(song.lyrics, val))
            || (searchType === "boxer" && includes(song.boxer, val))
        ) {
            return true;
        } else if (searchType === "all") {
            if (includes(song.boxer, val)) {
                return true;
            }

            if (includes(song.artist, val) || includes(song.singer, val)) {
                return true;
            }

            if (song.year === parseInt(val)) {
                return true;
            }

            if (includes(song.song, val)) {
                return true;
            }
        }

        return false;
    });
}

function getLocationSearch(locationPathName: string): string[] {
    const locationPathNameSplit = locationPathName.split('/');

    if (locationPathNameSplit.length === 3) {
        // basic search without type
        return [locationPathNameSplit[locationPathNameSplit.length - 1], "all"];
    } else if (locationPathNameSplit.length === 4) {
        // search with type
        return [locationPathNameSplit[locationPathNameSplit.length - 2], locationPathNameSplit[locationPathNameSplit.length - 1] ?? "all"];
    }

    return [];
}

function Search(props: { songs: song[] }) {
    const location = useLocation();
    const [locationSearchValue, locationSearchType] = getLocationSearch(location.pathname);
    const history = useHistory();

    const [searchResults, setSearchResults] = useState<song[]>([]);
    const [search, setSearch] = useState<string>("");
    const [searchType, setSearchType] = useState<SearchType>("all");

    if (locationSearchValue && search !== locationSearchValue) {
        setSearch(locationSearchValue);
    }

    const inputChange =
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            history.push(`/boxing-references/${e.target.value}/${locationSearchType}`);
            setSearch(e.target.value);
        }

    const handleChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        history.push(`/boxing-references/${locationSearchValue}/${e.target.value}`);
        setSearchType(e.target.value as SearchType);
    }

    useEffect(() => {
        setSearchResults(SearchSongs(props.songs, search, searchType));
    }, [search, searchType, props.songs])

    useEffect(() => {
        if (search === '') {
            document.title = `Boxing references in media`;
        } else {
            document.title = `Boxing references for "${search}"`;
        }
    }, [search]);

    return (
        <div className="search">
            <form noValidate autoComplete="off">
                <Box mr={1} display="inline">
                    <TextField id="standard-basic" label="Search" spellCheck="false" value={search}
                               onChange={inputChange}/>
                </Box>
                <Box display="inline">
                    <FormControl>
                        <InputLabel>Type</InputLabel>
                        <Select
                            native
                            onChange={handleChange}
                        >
                            <option value="all">All</option>
                            <option value="artist">Artist/Singer/Rapper</option>
                            <option value="song">Song</option>
                            <option value="lyrics">Lyrics</option>
                            <option value="boxer">Boxer</option>
                        </Select>
                    </FormControl>

                    <GithubLink>
                        <Link target="_blank" rel="noopener" href="https://github.com/boxing/boxing-references">
                            <GitHub/>
                        </Link>
                    </GithubLink>

                    <TwitterLink>
                        <Link target="_blank" rel="noopener" href="https://twitter.com/Mike_DiDomizio">
                            <Twitter/>
                        </Link>
                    </TwitterLink>
                </Box>
            </form>

            <div>{searchResults.length} result{searchResults.length !== 1 && <span>s</span>}</div>

            {searchResults.length > 0 &&
            <TableContainer>
                <Table aria-label="Boxing references">
                    <TableHead>
                        <TableRow>
                            <TableCell>Artist</TableCell>
                            <TableCell>Song</TableCell>
                            <TableCell>Singer/Rapper</TableCell>
                            <TableCell>Boxer</TableCell>
                            <TableCell>Lyrics</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults.map((song, i) =>
                            <TableRow key={i}>
                                <TableCell>{song.artist}</TableCell>
                                <TableCell>
                                    <Link target="_blank" href={song.metadata.genius}>
                                        {song.song}
                                    </Link></TableCell>
                                <TableCell>{song.singer}</TableCell>
                                <TableCell>{song.boxer}</TableCell>
                                <TableCell><Lyrics>{song.lyrics}</Lyrics></TableCell>
                                <TableCell>
                                    <Youtube id={song.metadata.song.id} source={song.metadata.song.id}
                                             start={song.metadata.song.start}
                                             end={song.metadata.song.end}/>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            }
        </div>
    );
}

export default Search;
