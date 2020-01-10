import React from 'react';

/**
 * 渲染右侧固定表格
 * */
export default function renderRightTable(columns, rows) {
  const { state } = this;
  const colGroup = renderColumns.call(this, columns);
  const fixedTableHeight = getFixedTableHeight.call(this);
  const obj = {
    parent: this,
    rows,
    height: fixedTableHeight,
    columns,
    colGroup,
    forwardRef: this.rightTableBodyEl,
    tType: 'right',
  };
  return (
    <div
      className={`r-fixed-right__table ${state.rightShadow ? '_shadow ' : ''}`}
      style={{ width: this.tableWidth.right, right: this.scrollBarY }}
    >
      <div className={`r-table-header ${state.topShadow ? '_shadow ' : ''}`}>
        {renderTable(colGroup, renderTHead.call(this, columns))}
      </div>
      <FixedTableBody {...obj} />
    </div>
  );
}
