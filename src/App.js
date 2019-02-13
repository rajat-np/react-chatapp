import React, { Component } from 'react';
import './App.css';

import Chatroom from './Chatroom.js';

class App extends Component {
  state = {
    visibleScreen:'',
    userID:'tutor' // or 'learner' if this instance needs to be launched with learner userRole
  }
  componentDidMount(){
    // this is server side authentication which will be required in production
    fetch('http://localhost:3001/users', {     // auth user to get current authorized user from server
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username:'learner' }),
    })
      .then(response => {
        this.setState({
          visibleScreen:'chat'
        })
      })
      .catch(error => {
        console.error('error', error)
      })
  }
  render() {
    if (this.state.visibleScreen === 'chat')
      return (
        <div className="App">
          <Chatroom userID={this.state.userID}/>
        </div>
      )
    else 
      return (
        <div className="App">
          <h2>Authenticating...</h2>
        </div>
    )
  }
}

export default App;
