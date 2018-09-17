import React from 'react';
import './TextField.less';
import PropTypes from 'prop-types';

export default function TextField({
  className,
  value,
  onChange,
  symbol,
}) {
  return (
    <div className={`text-field ${className}`}>
      <span className="symbol">{symbol || '$'}</span>
      <input
        type="text"
        value={value}
        onChange={event => onChange(event.target.value)}
      />
    </div>
  );
}

TextField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  symbol: PropTypes.string,
};

TextField.defaultProps = {
  value: '',
  onChange() {},
  className: '',
  symbol: '$',
};
