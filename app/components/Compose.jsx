const React = require('react');
const $ = require('jquery');

function Compose(props) {

  function sendChatToApp() {
    var message = $( "#compose-message" ).val();
    console.log(message);
    $( "#compose-message" ).val("");
    props.onNewChat(message);    
  }
  
  function checkEnterKey(e) {
    if (e.charCode === 13 && !e.shiftKey) {
      e.preventDefault();
      sendChatToApp();
    }
  }
  
  return (
    <div id="compose">
      <textarea
        id="compose-message"
        onKeyPress={checkEnterKey}
        autoFocus
      ></textarea>
      <button id="send" onClick={sendChatToApp}>
        &nbsp;↵&nbsp;
      </button>
    </div>
  )
}

module.exports = Compose;