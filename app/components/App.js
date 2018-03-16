const React = require('react');
const Log = require('./Log');
const Compose = require('./Compose');
const Script = require('./Script');
const $ = require('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.newGuestChat = this.newGuestChat.bind(this);
    this.reorderChats = this.reorderChats.bind(this);
    this.changeChat = this.changeChat.bind(this);
    this.handleNewBlankMessage = this.handleNewBlankMessage.bind(this);
    
    
    this.state = {
      guestName: "Guest",
      botScript: this.mapMessages(this.props.botScript),
      botChatCount: this.props.botChatCount,
      chatData: []
    }
    // 🚸 This is duplicated below, probably shouldn't be.
    var chatData = {
    }
  }
  
  mapMessages(messageArray) {
    return messageArray.map((message, index) => {
      return {type: "script", text: message, index: index}
    })
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
    }, 500);
  }
  
  newBotChat() {
    console.log("BOTCHAT");
    console.log(this.state.botScript);
    var botChat =  {
      author: "Bot",
      authorType: "bot",
      message: this.state.botScript[this.state.botChatCount].text,
      timestamp: Date()
    }
    this.state.botChatCount += 1;
    
    this.updateData(botChat); 
  }
  
  reorderChats(newOrder) {
    var newScriptData = []
    for (var i in newOrder) {
      console.log(i + ": $$");
      console.log(newOrder[i].firstChild.firstChild.innerText);
      newScriptData.push(newOrder[i].firstChild.firstChild.innerText);
    }
    console.log("NSD");
    console.log(newScriptData);

    this.setState({
      botScript: this.mapMessages(newScriptData)
    })
  }
  
  changeChat(newMessage, key) {
    console.log("New Chats");
    console.log(key + ": " + newMessage);
    var botScript = this.state.botScript;
    botScript[key].text = newMessage;
    botScript[key].type = "script";
    this.setState({
      botScript: botScript
    })
  }
  
  handleNewBlankMessage() {
    console.log("NEW MESSAGE");
    this.setState((prevState, props) => ({
      botScript: prevState.botScript.concat({type: "edit", text: "", index: prevState.botScript.length})
    }));
  }
  
  componentDidMount() {
    this.newBotChat();
  }
  
  componentWillUnmount() {
  }
  
  render() {
    return (
      <div id="app">
        <div id="chat">
          <Log pollInterval={500} data={this.state.chatData} />
          <Compose
            onNewChat={this.newGuestChat}
            handleKeyPress={this.handleKeyPress}
          />
        </div>
        <Script
          data={this.state.botScript}
          reorder={this.reorderChats}
          changeChat={this.changeChat}
          newBlankMessage={this.handleNewBlankMessage}
        />
      </div>   
    )
  }
}

module.exports = App;