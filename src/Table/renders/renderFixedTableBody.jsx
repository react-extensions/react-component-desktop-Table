import React from 'react';


export default function FixedTableBody({
  parent,
  rows,
  height,
  columns,
  colGroup,
  forwardRef,
  tType,
}) {
  const range = parent.props.bigDataRenderRange;
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
    // 状态及数据
  } = useBigDataRender({
    data: rows,
    height,
    range,
    querySelect: el => el.querySelectorAll('.r-tr'),
  });

  const extendStyle = { ...containerStyle, height };

  return (
    <div
      onScroll={handleContainerScroll}
      style={extendStyle}
      className="r-table-body"
      ref={forwardRef}
    >
      <div style={{ height: placeholderHeight }}>
        <div ref={contentRef} style={contentStyle}>
          {renderTable(
            colGroup,
            null,
            renderTBody.call(parent, columns, data, index, tType)
          )}
          )}
        </div>
      </div>
    </div>
  );
}
