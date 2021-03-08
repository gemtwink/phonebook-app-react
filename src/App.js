import React from 'react';
import './App.css';
import ListContact from './Components/ListContacts';
import Header from './Components/Header';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <ReactNotification />
          <div className="container-fluid">
            <div className="menu-wrapper">
              <Header />
              <ListContact />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default App;
