import React from 'react';
import { compose } from 'redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { defaultProps, propTypes } from './props';

export class ShellContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  renderRoutes() {
    return (
      <Switch>
        <Route />
      </Switch>
    );
  }

  render() {
    return (
      <section>
        {this.renderRoutes()}
      </section>
    );
  }
}

ShellContainer.defaultProps = defaultProps;
ShellContainer.propTypes = propTypes;

export default withRouter(compose(
)(ShellContainer));
