import React from 'react';

/**
 * 渲染 colGroup 元素
 */
export default function renderColumns({ columns }) {
  return (
    <colgroup>
      {columns.map(({ __i__, width }) => (
        <col
          key={__i__}
          style={{
            minWidth: col.minWidth,
            width: this.USE_TILE_LAYOUT ? col.maxWidthInCol : col.minWidth,
          }}
        />
      ))}
    </colgroup>
  );
}
