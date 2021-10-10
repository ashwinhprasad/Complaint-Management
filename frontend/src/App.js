// importing the required modules
import './App.css';
import { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/pages/Home/Home"
import User from "./components/pages/User/User"

// contexts
export const tokenContext = createContext()

// main app component
function App() {
  const [token,setToken] = useState('')
  return (
    <Router>
      <Switch> 
      <div className="App">
        <tokenContext.Provider value={[token,setToken]}>
          <Route exact path="/" >  
            <Home />
          </Route>
          <Route exact path="/usr" >
            <User />
          </Route>
          </tokenContext.Provider>
      </div>
      </Switch>
    </Router>
  );
}

export default App;
