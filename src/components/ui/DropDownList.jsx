import React from 'react';
import PropTypes from 'prop-types';
import './DropDownList.less';

function renderItem(item, selectedItem, onSelect) {
  const isSelected = item.id === selectedItem;

  return (
    <div
      className={isSelected ? 'selected item' : 'item'}
      key={item.id}
      role="presentation"
      onClick={() => onSelect(item.id)}
    >
      {item.name}
    </div>
  );
}

/**
 * The Dropdown list component
 */
export default function DropDownList({
  showing,
  items,
  selectedItem,
  toggle,
  onSelect,
}) {
  const selectedItemToRender = items.filter(
    item => item.id === selectedItem,
  )[0];

  return (
    <div className={`${showing && 'active'} dropdown`}>
      <div
        role="presentation"
        className="selected item"
        onKeyPress={toggle}
        onClick={toggle}
      >
        <span className="name">
          {selectedItemToRender.name}
        </span>
        <div className="indicator">
          <i className="fa fa-arrow-down" />
        </div>
      </div>
      <div className="items">
        {items.map(item => renderItem(
          item,
          selectedItem,
          onSelect,
        ))}
      </div>
    </div>
  );
}

DropDownList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  selectedItem: PropTypes.string,
  showing: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

DropDownList.defaultProps = {
  selectedItem: null,
};
