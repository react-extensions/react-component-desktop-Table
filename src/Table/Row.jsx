import React from 'react';
import propTypes from 'prop-types';

const Component = React.memo(function Row({ data, columns }) {
  return (
    <div className="x-table-tr">
      {columns.map(({ dataIndex }) => (
        <div className="x-table-td">{data[dataIndex]}</div>
      ))}
    </div>
  );
});

Component.defaultProps = {
  columns: [],
  data: {},
};
Component.propTypes = {
  columns: propTypes.array,
  data: propTypes.object,
};

export default Component;
