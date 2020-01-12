import React from 'react';

/**
 * 渲染分体式的表格
 * */
const renderSplitLayoutTable = function(columns, rows) {
  const { props, state } = this;
  const { left, plain } = this.tableWidth;
  const colGroup = renderColumns.call(this, columns);

  const obj = {
    parent: this,
    rows,
    columns,
    colGroup,
    height: props.tableHeight,
    forwardRef: this.plainTableBodyTrackEl,
  };
  return (
    <div className="r-plain__table r-main__table">
      <div
        className={`r-header__track${state.topShadow ? '  _shadow ' : ''}`}
        style={{
          paddingLeft: `${left}px`,
          overflowY: this.scrollBarY ? 'scroll' : 'hidden',
        }}
        ref={this.plainTableHeadTrackEl}
      >
        <div className="r-table-header">
          {renderTable(colGroup, renderTHead.call(this, columns), null, {
            width: plain,
          })}
          })}
        </div>
        {/* 右侧固定列占位符 */}
        {rightPlaceholder.call(this)}
      </div>
      <SplitLayoutTableBody {...obj} />
    </div>
  );
};
