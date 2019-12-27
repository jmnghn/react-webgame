const React = require('react');
const ReactDOM = require('react-dom');

const WordRelay = require('./WordRelay');
const RenderTest = require('./RenderTest');
const PureComponentPractice = require('./PureComponentPractice');

ReactDOM.render(<PureComponentPractice />, document.querySelector('#root'));