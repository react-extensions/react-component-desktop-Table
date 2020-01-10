import React from 'react';

export default function SplitLayoutTableBody({
  parent,
  rows,
  height,
  columns,
  colGroup,
  forwardRef,
}) {
  const range = parent.props.bigDataRenderRange;
  const { left, plain } = parent.tableWidth;
  const {
    // 容器
    containerStyle,
    handleContainerScroll,
    // 轨道
    placeholderHeight,
    //  内容
    contentRef,
    contentStyle,
    data,
    index,
    // overSpeed,
    // 状态及数据
  } = useBigDataRender({
    data: rows,
    height,
    range,
    querySelect: el => el.querySelectorAll('.r-tr'),
  });

  const extendStyle = { ...containerStyle, height, paddingLeft: `${left}px` };

  return (
    <div
      onScroll={e => {
        parent.syncScroll(e);
        handleContainerScroll(e);
      }}
      style={extendStyle}
      className="r-body__track"
      ref={forwardRef}
    >
      <div className="r-table-body" style={{ height: placeholderHeight }}>
        <div ref={contentRef} style={contentStyle}>
          {renderTable(
            colGroup,
            null,
            renderTBody.call(parent, columns, data, index, 'normal'),
            { width: plain }
          )}
          )}
        </div>
      </div>

      {
        // 在有些浏览器中，padding-bottom 和 padding-right的布局标准有些怪异，
        // 导致不会计入 scrollWidth | scrollHeight,
        // 所以需要使用空div占位符代替以统一布局
      }
      {rightPlaceholder.call(parent)}
    </div>
  );
}
