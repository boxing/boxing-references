import './App.css';
import Youtube from "./components/youtube";
import Search from "./components/search";
import {song} from "./components/songs.interface";

function App() {
    const songs: song[] = []

    return (
        <div className="App">
            <Search songs={songs}></Search>
            <Youtube source="odSHFTv7tow" start={5} end={10}></Youtube>
        </div>
    );
}

export default App;
