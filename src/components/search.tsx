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

type SearchType = "all" | "artist" | "song" | "lyrics" | "boxer";

function SearchSongs(songs: song[], value: string, searchType: SearchType): song[] {
    if (value === '') {
        return [];
    }

    const includes = (song: string, val: string): boolean => {
        return song.toLowerCase().includes(val);
    }

    return songs.filter(song => {
        const val: string = value.toLowerCase();

        if (searchType === "artist" && includes(song.artist, val)) {
            return true;
        } else if (searchType === "song" && includes(song.song, val)) {
            return true;
        } else if (searchType === "lyrics" && includes(song.lyrics, val)) {
            return true;
        } else if (searchType === "boxer" && includes(song.boxer, val)) {
            return true;
        }

        if (searchType === "all") {
            if (includes(song.boxer, val)) {
                return true;
            }

            if (includes(song.artist, val)) {
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
                            <option value="artist">Artist</option>
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
                                <TableCell>{song.boxer}</TableCell>
                                <TableCell><Box fontStyle="italic">"{song.lyrics}"</Box></TableCell>
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
