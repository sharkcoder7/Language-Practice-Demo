import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Home from './components/Home';
import Main from './components/Main';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene>
          <Scene 
            key="root" 
            component={Home} 
            title="Home Page" 
            hideNavBar={true} 
            initial
          />
          <Scene 
            key="main" 
            component={Main} 
            title="Practice"
          />
        </Scene>
      </Router>
    );
  }
}
