import React from 'react';
/**
 * 渲染底部表格
 * */
const renderBottomTable = function(
  columns,
  leftTableWidth,
  plainTableWidth,
  rightTableWidth,

  hasRight,
  hasLeft,
  scrollBarX,
  scrollBarY,
  handleBottomMount
) {
  const { state, props } = this;
  const { leftShadow, rightShadow } = state;
  return (
    <div
      className="r-fixed-bottom__table"
      style={{ bottom: scrollBarX, right: scrollBarY }}
    >
      <div
        className="r-plain__table"
        style={{ paddingLeft: leftTableWidth }}
        ref={handleBottomMount}
      >
        <div className="r-table-body" style={{ width: plainTableWidth }}>
          {renderTable(
            renderColumns.call(this, columns.plain),
            null,
            renderTBody.call(this, columns.plain, props.fixedRows, 'bottom')
          )}
          )}
        </div>
        {rightPlaceholder.call(this)}
      </div>

      {hasLeft && (
        <div
          className={`r-fixed-left__table ${leftShadow ? '_shadow ' : ''}`}
          style={{ width: leftTableWidth }}
        >
          <div className="r-table-body">
            {renderTable(
              renderColumns.call(this, columns.left),
              null,
              renderTBody.call(this, columns.left, props.fixedRows, 'bottom')
            )}
            )}
          </div>
        </div>
      )}
      {hasRight && (
        <div
          className={`r-fixed-right__table ${rightShadow ? '_shadow ' : ''}`}
          style={{ width: rightTableWidth }}
        >
          <div className="r-table-body">
            {renderTable(
              renderColumns.call(this, columns.right),
              null,
              renderTBody.call(this, columns.right, props.fixedRows, 'bottom')
            )}
            )}
          </div>
        </div>
      )}
    </div>
  );
};
