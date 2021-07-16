import './App.css';
import Search from "./components/search";
import {data} from "./data";

function App() {
    return (
        <div className="App">
            <Search songs={data}/>
        </div>
    );
}

export default App;
