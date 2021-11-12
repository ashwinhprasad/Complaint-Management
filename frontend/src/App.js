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
      <div className="App">
        <tokenContext.Provider value={[token,setToken]}>
          <Switch>
            <Route exact path="/" >  
              <Home />
            </Route>
          </Switch>
          <Switch>
            <Route exact path="/usr" >
              <User />
            </Route>
          </Switch>
          </tokenContext.Provider>
      </div>
    </Router>
  );
}

export default App;
