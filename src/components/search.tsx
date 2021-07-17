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


const Lyrics = styled.div`
    white-space: pre-wrap;
    font-style: italic;
 
    &::before, &&::after {
        content: '"';
    }
`;

type SearchType = "all" | "artist" | "song" | "lyrics" | "boxer";

function SearchSongs(songs: song[], value: string, searchType: SearchType): song[] {
    if (value === '') {
        return [];
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

function Search(props: { songs: song[] }) {
    const [searchResults, setSearchResults] = useState<song[]>([]);
    const [search, setSearch] = useState<string>("");
    const [searchType, setSearchType] = useState<SearchType>("all");


    const inputChange =
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setSearch(e.target.value);
        }

    const handleChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        setSearchType(e.target.value as SearchType);
    }

    useEffect(() => {
        function findMatches(value: string, searchType: SearchType): song[] {
            return SearchSongs(props.songs, value, searchType);
        }

        setSearchResults(findMatches(search, searchType));
    }, [search, searchType, props.songs])

    return (
        <div className="search">
            <form noValidate autoComplete="off">
                <Box mr={1} display="inline">
                    <TextField id="standard-basic" label="Search" onChange={inputChange}/>
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
                </Box>
            </form>

            <div>{searchResults.length} result{searchResults.length !== 1 && <span>s</span>}</div>

            {searchResults.length > 0 &&
            <TableContainer>
                <Table aria-label="Songs with Boxing references">
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
