/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import ScepterReduxApp from '@source4society/react-scepter-redux-app';
import WebGTMComponent from '@source4society/react-scepter-web-gtm-component';
import createHistory from 'history/createBrowserHistory';
import configuration from 'configuration.json';
import 'sanitize.css/sanitize.css';

// Import root app
import MyApp from 'containers/MyApp';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
/*
import '!file-loader?name=[name].[ext]!./images/favicon-16x16.png';
import '!file-loader?name=[name].[ext]!./images/favicon-32x32.png';
import '!file-loader?name=[name].[ext]!./images/favicon-96x96.png';
import '!file-loader?name=[name].[ext]!./images/favicon-128.png';
import '!file-loader?name=[name].[ext]!./images/favicon-196x196.png';
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./images/favicon.png';
import '!file-loader?name=[name].[ext]!./images/mstile-70x70.png';
import '!file-loader?name=[name].[ext]!./images/mstile-144x144.png';
import '!file-loader?name=[name].[ext]!./images/mstile-150x150.png';
import '!file-loader?name=[name].[ext]!./images/mstile-310x150.png';
import '!file-loader?name=[name].[ext]!./images/mstile-310x310.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon-57x57.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon-60x60.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon-72x72.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon-114x114.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon-120x120.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon-144x144.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon-152x152.png';
import '!file-loader?name=[name].[ext]!./images/logo.png';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess';
*/
// Import i18n messages
import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import './global-styles';

// Create redux store with history
const history = createHistory();
const MOUNT_NODE = document.getElementById('app');

global.configuration = configuration;

const render = () => {
  ReactDOM.render(
    <ScepterReduxApp
      history={history}
      MyApp={MyApp}
      isBrowser
      GTMComponent={WebGTMComponent}
    />,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/MyApp'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
