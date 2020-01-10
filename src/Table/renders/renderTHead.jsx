import React from 'react';
import classnames from 'classnames';

/**
 * 渲染 tHead
 * @param {array} columns
 */
export default function renderTHead(columns) {
  const renderCheckbox = () => {
    const checkStatus = this.computeCheckStatus();

    let Icon = null;
    switch (checkStatus) {
      case CHECKED:
        Icon = tableConfig.icon.Check;
        break;
      case NOT_CHECKED:
        Icon = tableConfig.icon.NotCheck;
        break;
      case HALF_CHECKED:
        Icon = tableConfig.icon.HalfCheck;
        break;
      default:
        break;
    }
    if (!Icon) {
      return null;
    }
    return <Icon onClick={this.checkedAll.bind(this, checkStatus)} />;
  };

  const { height, ...headRowProps } = this.props.onHeaderRow();

  const render = (type, col) => {
    if (type === 'expand' || type === 'radio') {
      return null;
    }
    if (type === 'checkbox') {
      return renderCheckbox();
    }
    return renderPlainTh.call(this, col);
  };

  return (
    <thead>
      <tr className="r-tr" style={{ height }} {...headRowProps}>
        {columns.map(col => {
          const { type, __i__, align, className } = col;
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
              <div className="r-th-content-wrap">{render(type, col)}</div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
