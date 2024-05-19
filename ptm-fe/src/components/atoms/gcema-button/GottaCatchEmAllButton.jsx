/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import './GottaCatchEmAllButton.css';

function GottaCatchEmAllButton({ onClick, text }) {
  return (
    <button type="button" className="gceab-pokemon-button" onClick={onClick}>
      {text}
    </button>
  );
}

GottaCatchEmAllButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GottaCatchEmAllButton;
