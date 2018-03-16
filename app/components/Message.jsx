const React = require('react');

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.editMessage = this.editMessage.bind(this);
    this.saveMessage = this.saveMessage.bind(this);
    this.checkEnterKey = this.checkEnterKey.bind(this);
    this.state = {
      type: this.props.type,
      message: this.props.message
    }
  }
  
  editMessage() {
    console.log(this.state.type);
    this.setState({
      type: "edit"
    }) 
  }
  
  saveMessage() {
    console.log("%^%^%");
    console.log(this.state);
    console.log(this.state.type);
    this.setState({
      type: "script"
    })
    
    this.props.saveChange(this.state.typed, this.props.index);
  }
  
  onChange(event) {
    this.setState({typed: event.target.value});
  }
  
  checkEnterKey(e) {
    if (e.charCode === 13 && !e.shiftKey) {
      e.preventDefault();
      this.saveMessage();
    }
  }
  
  
  componentDidMount() {

  }
  
  componentWillUnmount() {  
  }
  
  render() {
    const author = <p className="author"><strong>{this.props.message.author}</strong></p>
    const time =  <p className="time"><em>{this.props.message.timestamp}</em></p>
    
    
    // Was using this to use linebreaks in spades app: {nl2br(this.props.message.text)}
          
    // In Log:
    if (this.state.type === "log") {
      const messageText = <p className="message-text">{this.props.message.message}</p>
      return (
        <li className={"log-message message " + this.props.message.authorType + "-message"}>
          {author}
          {time}
          {messageText}
        </li>  
      )
      
    // In script list:
    } else if (this.state.type === "script") {
      const messageText = <p className="message-text">{this.props.message}</p>
      return (
        <li className="script-message message">
          <div className="script-message-text">{messageText}</div><div className="edit-button script-button" onClick={this.editMessage}>📝</div>
        </li>
      )
      
    // While editing Script
    } else if (this.state.type === "edit") {
      return ( 
        <li className="script-message message">
          <input
            autoFocus
            className="script-message-input"
            type="text"
            defaultValue={this.props.message}
            onChange={this.onChange.bind(this)}
            onKeyPress={this.checkEnterKey}
          ></input>
          <div className="save-button script-button" onClick={this.saveMessage}>💾</div>
        </li> 
      )
    }
  }
}

module.exports = Message;