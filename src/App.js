
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home';
import CreatedDog from './components/CreateDog/CreateDog'
import Detail from './components/Detail/Detail'
import axios from'axios'

axios.defaults.baseURL="https://deployback-production-828c.up.railway.app/"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component ={LandingPage}/>
        <Route  path='/home' component ={Home}/>
        <Route path='/dogsCreate' component={CreatedDog}/>
        <Route path='/dogs/:id' component={Detail}/>
      </Switch>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
