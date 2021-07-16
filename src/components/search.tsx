import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@material-ui/core";
import {ChangeEvent, useState} from "react";
import {song} from "./songs.interface";

function Search(props: { songs: song[] }) {
    const [searchResults, setSearchResults] = useState<song[]>([]);

    function inputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const results: song[] = props.songs.filter(song => {
            const val = e.target.value.toLowerCase();
            if (song.boxer.toLowerCase().includes(val)) {
                return true;
            }

            if (song.artist.toLowerCase().includes(val)) {
                return true;
            }
        });
        setSearchResults(results);
    }

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
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Search;
