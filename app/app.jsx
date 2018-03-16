const React = require('react');
const ReactDOM = require('react-dom');

var botScript = [
  "This is the first thing I say.",
  "This is the second thing I say.",
  "The third thing I say is this.",
  "Smoop"
]

var botChatCount = 0;

/* Import Components */
const App = require('./components/App');

ReactDOM.render(<App botScript={botScript} botChatCount={botChatCount} />, document.getElementById('main'));