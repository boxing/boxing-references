import Search from './components/search';
import { data } from './data';

import { BrowserRouter as Router } from 'react-router-dom';
import { Grid } from '@material-ui/core';

function App() {
  return (
    <Router>
      <div className="App">
        <Grid container justifyContent="center">
          <Search songs={data} />
        </Grid>
      </div>
    </Router>
  );
}

export default App;
