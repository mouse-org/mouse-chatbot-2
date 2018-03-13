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
      chatData: [],
      scriptData: this.props.botScript
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
      authorType: "person",
      message: newMessage,
      timestamp: Date()
    }

    this.updateData(guestChat);
    
    setTimeout(() => {
      this.newBotChat();
    }, 1000);
  }
  
  newBotChat() {
    var botChat =  {
      author: "Bot",
      authorType: "bot",
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
        <div id="chat">
          <Log pollInterval={500} data={this.state.chatData} />
          <Compose onNewChat={this.newGuestChat} />
        </div>
        <div id="script">
          <Script data={this.state.scriptData} />
        </div>
      </div>   
    )
  }
}


class Log extends React.Component {
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
    console.log(this.props.data);
    const messages = this.props.data.map((message, index) => {
      <Message message={message} key={index} type="log" />    
    }
    );
    
    return (
      <div id="log-messages">
        <ul>
          {messages}
        </ul>
      </div>
    )
  }
}

class Script extends React.Component {
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
      <Message message={message} key={index} type="script" />                       
    );
    
    return (
      <div id="script-messages">
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
    const author = <p className="author"><strong>{this.props.message.author}</strong></p>
    const time =  <p className="time"><em>{this.props.message.timestamp}</em></p>
    
    
    // Was using this to use linebreaks in spades app: {nl2br(this.props.message.text)}
    if (this.props.type === "log") {
      const messageText = <p className="message-text">{this.props.message.message}</p>
      return (
        <li className={"log-message message " + this.props.message.authorType + "-message"}>
          {author}
          {time}
          {messageText}
        </li>  
      )
    } else {
      const messageText = <p className="message-text">{this.props.message}</p>
      return (
        <li className="script-message message">
          {messageText}
        </li>
      )
    }
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
  <App botScript={botScript} />,
  document.getElementById('root')
);