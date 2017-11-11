import PropTypes from 'prop-types';
import { List } from 'immutable';
export const defaultProps = {
  jwt: '',
  isAuthenticated: false,
  userRoles: List([]),
  username: '',
  userId: '',
};

export const propTypes = {
  jwt: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  userRoles: PropTypes.object,
  username: PropTypes.string,
  userId: PropTypes.string,
};
