import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MainLayout from './templates/MainLayout';
import Home from './views/home';
import { getCurrentWalletConnected } from './utils/interact'
import { useState, useEffect } from 'react';
import Transfers from './views/Transfers';

require('dotenv').config();


function App() {

const [flip, setFlip] = useState(false)  

  let dev1 = process.env.REACT_APP_DEV1
  let dev2 = process.env.REACT_APP_DEV2
  let dev3 = process.env.REACT_APP_DEV3


  let adminWallet = [dev1.toLowerCase(), dev2.toLowerCase(), dev3.toLowerCase()]

  useEffect(async() => {


    const {address} = await getCurrentWalletConnected()

    if(adminWallet.includes(address.toLowerCase())){
      setFlip(true)
    }

  }, [])
  return (
      <div className="App">
        <Router>
          <MainLayout>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
         
   
             
               <Route exact path="/transfers">
                <Transfers />
               </Route>
             </Switch>
          </MainLayout>
        </Router>
      </div>

  );
}

export default App;
