import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Message from './Message.js';
import Chatkit from '@pusher/chatkit-client';



class Chatroom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            currentRoom:{},
            currentUser:{},
            currentUserRole:this.props.userID
        };

        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: '',
            userId: this.state.currentUserRole,
            tokenProvider: new Chatkit.TokenProvider({
              url: 'auth_url_in_server',
            }),
          })
          chatManager
          .connect()
          .then(currentUser => {
            this.setState({ currentUser })
            return currentUser.subscribeToRoom({
              roomId: '19401921',
              messageLimit: 100,
              hooks: {
                onMessage: message => {
                  let newMessages = this.state.messages;  
                  console.log(message.sender.name);         
                  newMessages.push({
                      text:message.text,
                      username:message.sender.name
                })         
                  this.setState({messages: newMessages})
                },
              },
            })
          })      
          .then(currentRoom => {
            this.setState({ currentRoom })
           })
          .catch(error => console.error('error', error))
        this.scrollToBot();
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    //always load chat at last message
    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    sendMessage(e) {
        e.preventDefault();
            console.log('Sending msgs!!')
                this.state.currentUser.sendMessage({
                    text: ReactDOM.findDOMNode(this.refs.msg).value,
                    roomId: this.state.currentRoom.id,
                  })   
            ReactDOM.findDOMNode(this.refs.msg).value = "";
    }

    render() {
        const username = this.state.currentUserRole; // or tutor in case of tutor dashboard. 
        const { messages } = this.state;

        return (
            <div className="chatroom">
                <h3>Chat with {this.state.currentUserRole ==="learner" ? "tutor" : "learner"}</h3>
                <ul className="chats" ref="chats">
                    {
                        messages.map((chat) => 
                            <Message chat={chat} user={this.state.currentUserRole}/>
                        )
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.sendMessage(e)}>
                    <input type="text" ref="msg" />
                    <input type="submit" value="Send" />
                </form>
            </div>
        );
    }
}

export default Chatroom;