import React from 'react';
import { withRouter } from 'react-router-dom';
import { valueOrDefault, ifTrueElseDefault } from '@source4society/scepter-utility-lib';
import App from '@source4society/react-authapp-container';
import LoadingIndicator from '@source4society/react-loadingindicator-component';
import Shell from 'containers/ShellContainer';
import MyAppStyle from 'styles/MyAppStyle';
import configuration from 'configuration.json';

export class MyApp extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const stage = process.env.NODE_ENV;
    const GTMid = configuration.environments[stage].GTM;
    /* eslint-disable */
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=ifTrueElseDefault(l!='dataLayer', '&l='+l:'');j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f = valueOrDefault(f, { parentNode: { insertBefore: () => null } });
    f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', GTMid);
  }
  render() {
    return (
      <MyAppStyle>
        <App shellComponent={Shell} loadingIndicatorComponent={LoadingIndicator} />
      </MyAppStyle>
    );
  }
}

App.propTypes = {};

export default withRouter(MyApp);
