import React from 'react';

/**
 * 渲染左侧固定表格
 * */
export default function renderLeftTable(columns, rows) {
  const { state } = this;
  const colGroup = renderColumns.call(this, columns);
  const leftTableWidth = this.tableWidth.left;
  const fixedTableHeight = getFixedTableHeight.call(this);
  const obj = {
    parent: this,
    rows,
    height: fixedTableHeight,
    columns,
    colGroup,
    forwardRef: this.leftTableBodyEl,
    tType: 'left',
  };
  return (
    <div
      className={`r-fixed-left__table${state.leftShadow ? ' _shadow' : ''}`}
      style={{ width: leftTableWidth }}
    >
      <div className={`r-table-header${state.topShadow ? ' _shadow ' : ''}`}>
        {renderTable(colGroup, renderTHead.call(this, columns))}
      </div>

      <FixedTableBody {...obj} />
    </div>
  );
}
