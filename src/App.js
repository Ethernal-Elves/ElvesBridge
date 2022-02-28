import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MainLayout from './templates/MainLayout';
import Transfers from './views/Transfers';
import Admin from './views/Transfers/Admin';

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
               <Route exact path="/hv">
               <Admin />
               </Route>
             </Switch>
          </MainLayout>
        </Router>
      </div>

  );
}

export default App;
