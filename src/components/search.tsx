import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@material-ui/core";
import {ChangeEvent, useState} from "react";
import {song} from "./songs.interface";
import Youtube from "./youtube";

function Search(props: { songs: song[] }) {
    const [searchResults, setSearchResults] = useState<song[]>([]);

    function findMatches(value: string): song[] {
        return props.songs.filter(song => {
            const val: string = value.toLowerCase();
            if (song.boxer.toLowerCase().includes(val)) {
                return true;
            }

            if (song.artist.toLowerCase().includes(val)) {
                return true;
            }

            if (song.year === parseInt(val)) {
                return true;
            }

            return false;
        });
    }

    const inputChange =
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearchResults(findMatches(e.target.value));

    return (
        <div className="search">
            <form noValidate autoComplete="off">
                <TextField id="standard-basic" label="Artist, Boxer, Song" onChange={inputChange}/>
            </form>

            <TableContainer>
                <Table aria-label="Songs with Boxing references">
                    <TableHead>
                        <TableRow>
                            <TableCell>Artist</TableCell>
                            <TableCell>Song</TableCell>
                            <TableCell>Boxer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults.map((song, i) =>
                            <TableRow key={i}>
                                <TableCell>{song.artist}</TableCell>
                                <TableCell>{song.song}</TableCell>
                                <TableCell>{song.boxer}</TableCell>
                                <TableCell>
                                    <Youtube id="test" source="odSHFTv7tow" start={5} end={10}/>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Search;
