import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import MyNavBar from '../Components/Shared/MyNavBar/MyNavBar';
import firebaseConnection from '../Helpers/Data/Connection';
import Home from '../Components/Pages/Home/Home';
import MyStuff from '../Components/Pages/MyStuff/MyStuff';
import SingleStuff from '../Components/Pages/SingleStuff/SingleStuff';
import Edit from '../Components/Pages/Edit/Edit';
import New from '../Components/Pages/New/New';
import Auth from '../Components/Pages/Auth/Auth';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

firebaseConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeEventListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeEventListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Router>
          <MyNavBar authed={authed} />
          <Switch>
              <PrivateRoute path="/" exact component={Home} authed={authed}/>
              <PrivateRoute path="/stuff/new" exact component={New} authed={authed}/>
              <PublicRoute path="/auth" exact component={Auth} authed={authed}/>
              <PrivateRoute path="/stuff" exact component={MyStuff} authed={authed} />
              <PrivateRoute path="/stuff/:itemPathId/edit" exact component={Edit} authed={authed} />
              <PrivateRoute path="/stuff/:itemPathId" exact component={SingleStuff} authed={authed} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
