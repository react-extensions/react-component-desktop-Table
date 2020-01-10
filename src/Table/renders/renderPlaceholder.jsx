import React from 'react';

/**
 * 渲染固定右侧的占位符
 * */
export default function rightPlaceholder() {
  return (
    this.HAS_RIGHT && (
      <div
        className="r-table-right-placeholder"
        style={{
          height: 1,
          width: this.tableWidth.right,
          visibility: 'hidden',
        }}
      />
    )
  );
}
