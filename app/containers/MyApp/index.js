import React from 'react';
import PropTypes from 'prop-types';
import { valueOrDefault } from '@source4society/scepter-utility-lib';
import { withRouter } from 'platform/router';
import App from '@source4society/react-authapp-container';
import { UniversalLoader } from 'platform/components';
import { getConfigurationByKey as getConfigurationByKeyFunction } from 'platform/utilities';
import Shell from 'containers/ShellContainer';
import MyAppStyles from 'styles/MyAppStyles';

export class MyApp extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const ShellComponent = valueOrDefault(this.props.ShellComponent, Shell);
    const LoadingIndicatorComponent = valueOrDefault(this.props.LoadingIndicator, UniversalLoader);
    const Application = valueOrDefault(this.props.App, App);
    const { GTMComponent } = this.props;
    const getConfigurationByKey = valueOrDefault(this.props.getConfigurationByKey, getConfigurationByKeyFunction);
    const GTMid = getConfigurationByKey('GTM', global.configuration, process.env.NODE_ENV);
    return (
      <MyAppStyles>
        <GTMComponent containerId={GTMid} />
        <Application location={this.props.location} shellComponent={ShellComponent} loadingIndicatorComponent={LoadingIndicatorComponent} />
      </MyAppStyles>
    );
  }
}

MyApp.propTypes = {
  ShellComponent: PropTypes.any,
  LoadingIndicator: PropTypes.any,
  App: PropTypes.any,
  getConfigurationByKey: PropTypes.func,
  GTMComponent: PropTypes.any,
  location: PropTypes.object,
};

export default withRouter(MyApp);
