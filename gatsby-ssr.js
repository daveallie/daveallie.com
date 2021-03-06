const React = require('react');
const { SUBSITE } = require('./config/util/subsite');

const BodyPresetBackground = () => {
  const className = SUBSITE === 'home' ? 'body_Hero' : 'body_Offwhite';

  const codeToRunOnClient = `(function() {document.body.className = document.body.className + ' ' + '${className}'})()`;
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

exports.onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([<BodyPresetBackground key='preset-background' />]);
};
