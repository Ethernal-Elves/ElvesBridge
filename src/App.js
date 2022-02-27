import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MainLayout from './templates/MainLayout';
import Transfers from './views/Transfers';

require('dotenv').config();


function App() {


  return (
      <div className="App">
        <Router>
          <MainLayout>
            <Switch>
               <Route exact path="/">
                <Transfers />
               </Route>
             </Switch>
          </MainLayout>
        </Router>
      </div>

  );
}

export default App;
