import React from 'react';
import { ParsedColumn } from './utils/parseColumns';
import { ColumnWidths } from './utils/computeLayouts';

interface ColGroupProps {
  columns: ParsedColumn[];
  colWidths: ColumnWidths;
}

function ColGroup({ columns, colWidths }: ColGroupProps) {
  if (!columns.length) {
    return null;
  }
  return (
    <colgroup>
      {columns.map(({ __key }) => (
        <col
          key={__key}
          style={{
            minWidth: colWidths[__key],
            width: colWidths[__key],
          }}
        />
      ))}
    </colgroup>
  );
}

export default React.memo(ColGroup);
