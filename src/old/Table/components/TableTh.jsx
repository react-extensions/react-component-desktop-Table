import React from 'react';
import propTypes from 'prop-types';

const Component = React.memo(function TableTh({ onThMount, col }) {
  const { title, __i__ } = col;
  return (
    <>
      <span ref={onThMount} data-key={__i__} className="r-th-content">
        {title}
      </span>
    </>
  );
});

Component.defaultProps = {};
Component.propTypes = {};

export default Component;
