import './App.css';
import Search from "./components/search";
import {data} from "./data";

import {BrowserRouter as Router} from "react-router-dom";
import Stats from './components/stats';

function App() {
    return (
        <Router>
            <div className="App">
                <Search songs={data}/>
            </div>
        </Router>
    );
}

export default App;
