import React from 'react';
import { UniversalView } from 'platform/components';
import { Switch, Route, withRouter } from 'platform/router';
import { defaultProps, propTypes } from './props';

export class ShellContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  renderRoutes() {
    return (
      <Switch>
        <Route path="/" />
      </Switch>
    );
  }

  render() {
    return (
      <UniversalView>
        {this.renderRoutes()}
      </UniversalView>
    );
  }
}

ShellContainer.defaultProps = defaultProps;
ShellContainer.propTypes = propTypes;

export default withRouter(ShellContainer);
