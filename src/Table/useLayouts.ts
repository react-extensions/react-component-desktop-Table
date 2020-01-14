import { useMemo, useEffect, useRef, useState } from 'react';
import parseColumns, { ParsedData } from './utils/parseColumns';
import computeLayouts, { Layouts } from './utils/computeLayouts';
import { Column } from './Table';

export default function useLayouts(
  columns: Column[],
  width?: number
): [React.MutableRefObject<HTMLDivElement | null>, ParsedData, Layouts] {
  const containerRef = useRef<HTMLDivElement>(null);
  const meta = useMemo(() => parseColumns(columns), [columns]);
  const [layouts, setLayouts] = useState<Layouts>(() => ({
    totalTableWidth: 0,
    fixedLeftTableWidth: 0,
    fixedRightTableWidth: 0,
    mainTableWidth: 0,
    colWidths: {},
  }));

  useEffect(() => {
    if (!containerRef.current || typeof width !== 'undefined') {
      return;
    }
    const { allCols, colMinWidths } = meta;
    const _layouts: Layouts = computeLayouts(containerRef.current.clientWidth, allCols, colMinWidths);
    setLayouts(_layouts);
  }, [meta, width]);

  const layoutsResult = useMemo(() => {
    if (typeof width !== 'undefined') {
      const { allCols, colMinWidths } = meta;
      const _layouts: Layouts = computeLayouts(width, allCols, colMinWidths);
      return _layouts;
    }
    return layouts;
  }, [layouts, meta, width]);

  return [containerRef, meta, layoutsResult];
}
