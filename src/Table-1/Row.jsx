import React from 'react';
import propTypes from 'prop-types';
import getPrefixCls from './utils/getPrefixClassName';

const Component = React.memo(function Row({ data, columns }) {
  return (
    <div className={getPrefixCls('table-tr')}>
      {columns.map(({ dataIndex }) => (
        <div className={getPrefixCls('table-td')}>{data[dataIndex]}</div>
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
