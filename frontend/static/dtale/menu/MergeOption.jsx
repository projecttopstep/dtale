import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';

import { MenuItem } from './MenuItem';

class MergeOption extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MenuItem description={this.props.t('menu_description:merge')} onClick={this.props.open}>
        <span className="toggler-action">
          <button className="btn btn-plain">
            <i className="fas fa-object-group pl-3 pr-3" />
            <span className="font-weight-bold">{this.props.t('Merge & Stack', { ns: 'menu' })}</span>
          </button>
        </span>
      </MenuItem>
    );
  }
}
MergeOption.displayName = 'MergeOption';
MergeOption.propTypes = {
  open: PropTypes.func,
  t: PropTypes.func,
};

export default withTranslation(['menu', 'menu_description'])(MergeOption);
