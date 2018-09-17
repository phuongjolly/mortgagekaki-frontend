import React from 'react';
import PropTypes from 'prop-types';
import './CheckBox.less';

export default function CheckBox({
  checked,
  children,
  onSelect,
}) {
  return (
    <div
      role="presentation"
      className={checked ? 'checked check-box' : 'check-box'}
      onClick={onSelect}
    >
      <span className="box">&nbsp;</span>
      {children}
    </div>
  );
}

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onSelect: PropTypes.func.isRequired,
};
