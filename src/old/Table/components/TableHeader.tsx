import React from 'react';
import classnames from 'classnames';
import { ParsedColumn } from '../hooks/useColumnsParse';

export interface TableHeaderProps {
  columns: ParsedColumn[];
}

function TableHeader({ columns }: TableHeaderProps) {
  return (
    <thead>
      <tr className="r-tr">
        {columns.map(col => {
          const { __key, className, title } = col;
          const _className = classnames('r-th', className);
          return (
            <th key={__key} className={_className}>
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
