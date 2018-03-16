const React = require('react');

const Message = require('./Message');

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    console.log(this.el.lastChild);
    this.el.lastChild.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end'});
  }
  
  render() {
    console.log("IN LOG");
    console.log(this.props.data);
    const messagess = this.props.data.map((message, index) =>
      <Message message={message} key={index} type="log" />    
    );
    
    return (
      <div
        id="log-messages"
        ref={el => { this.el = el; }}
      >
        <ul>
          {messagess}
        </ul>
      </div>
    )
  }
}

module.exports = Log;