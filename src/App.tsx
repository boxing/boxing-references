import './App.css';
import Search from "./components/search";
import {song} from "./components/songs.interface";

function App() {
    const songs: song[] = [
        // todo this is for testing purposes
        {
            song: "Surf Swag",
            year: 2009,
            singer: "Lil Wayne",
            artist: "Lil Wayne",
            lyrics: "Weezy beat the beat up like Sonny Liston",
            boxer: "Sonny Liston",
        },
        {
            song: "Bitch Please",
            year: 1999,
            artist: "Snoop Dogg",
            singer: 'Xzibit',
            lyrics: "Scrap like Mike Tyson",
            boxer: "Mike Tyson",
        }
    ]

    return (
        <div className="App">
            <Search songs={songs}></Search>
        </div>
    );
}

export default App;
