import React from 'react';
import { ParsedColumn } from '../hooks/useColumnsParse';

interface ColGroupProps {
  columns: ParsedColumn[];
}

function ColGroup({ columns }: ColGroupProps) {
  if (!columns.length) {
    return null;
  }
  return (
    <colgroup>
      {columns.map(col => (
        <col
          key={col.__key}
          style={{
            minWidth: col.minWidth,
            width: this.USE_TILE_LAYOUT ? col.maxWidthInCol : col.minWidth,
          }}
        />
      ))}
    </colgroup>
  );
}

ColGroup.defaultProps = {
  columns: [],
};

export default React.memo(ColGroup);
