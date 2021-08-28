
import './App.css';
import Register from './component/register.js';
import Login from './component/login.js';
import UserProfile from './component/userProfile.js';
import Dashboard from './component/dashboard.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {


  return (
    <div className="App">
      <Router>

        <Switch>
          <Route path='/' component={Login} exact />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={UserProfile} />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>

      </Router>

    </div>
  );
}

export default App;
