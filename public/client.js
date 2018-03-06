var botScript = [
  "This is the first thing I say.",
  "This is the second thing I say.",
  "The third thing I say is this."
]

var botChatCount = 0;





class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.newGuestChat = this.newGuestChat.bind(this);
    
    
    this.state = {
      guestName: "Guest",
      chatData: []
    }
    // 🚸 This is duplicated below, probably shouldn't be.
    var chatData = {
    }
    
  }
  
  updateData(data) {
    console.log("Updating Data!");
    console.log(data);
    this.setState((prevState, props) => ({
      chatData: prevState.chatData.concat([data])
    }));
  }
  
  newGuestChat(newMessage) {
    var guestChat = {
      author: this.state.guestName,
      message: newMessage,
      timestamp: Date()
    }

    this.updateData(guestChat);
    
    setTimeout(() => {
      this.newBotChat();
    }, 2000);
  }
  
  newBotChat() {
    var botChat =  {
      author: "Bot",
      message: botScript[botChatCount],
      timestamp: Date()
    }
    botChatCount += 1;
    
    this.updateData(botChat);
    
  }
  
  
  componentDidMount() {
    
    
  }
  
  componentWillUnmount() {
  }
  
  render() {
    return (
      <div id="app">
        <Messages pollInterval={500} data={this.state.chatData} />
        <Compose onNewChat={this.newGuestChat} />
      </div>   
    )
  }
}


class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  }
  
  componentDidMount() {    
  }
  
  componentWillUnmount() {
  }
  
  render() {
    const messages = this.props.data.map((message, index) =>
      <Message message={message} key={index}/>                       
    );
    
    return (
      <div id="messages">
        <ul>
          {messages}
        </ul>
      </div>
    )
  }
}


class Message extends React.Component {
  constructor(props) {
    super(props);
    
  }
  
  componentDidMount() {
    
  }
  
  componentWillUnmount() {
    
  }
  
  render() {
    // Was using this to use linebreaks in spades app: {nl2br(this.props.message.text)}
    return (
      <li className="message">
        <p className="author">
          {this.props.message.author}
        </p>
        <p className="message-text">
          {this.props.message.message}
        </p>
        <p className="time">
          {this.props.message.timestamp}
        </p>
      </li>  
    ) 
  }
}

function Compose(props) {

  function sendChatToApp() {
    var message = $( "#compose-message" ).val();
    console.log(message);
    $( "#compose-message" ).val("");
    props.onNewChat(message);    
  }
  
  return (
    <div id="compose">

      <textarea id="compose-message"></textarea>
      <button id="send" onClick={sendChatToApp}>
        &nbsp;↵&nbsp;
      </button>

    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);