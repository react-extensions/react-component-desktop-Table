import React from 'react';
import classnames from 'classnames';

function TableHeader({ columns, height }) {
  return (
    <thead>
      <tr className="r-tr" style={{ height }}>
        {columns.map(col => {
          const { align, className, __i__, type, title } = col;
          const _className = classnames(
            'r-th',
            type && '_align-center',
            !type && align && `_align-${col.align}`,
            className
          );
          return (
            <th key={__i__} className={_className}>
              {
                // ie中不能将td th作为绝对定位的参照节点，
                // 所以如果 在th td内有绝对定位的元素，样式会出问题
                // 加一层div, 并将其style设置为position:relative ，来标准化这一样式
              }
              <div className="r-th-content-wrap">
                <span className="r-th-content">{title}</span>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

TableHeader.defaultProps = {};

export default React.memo(TableHeader);
