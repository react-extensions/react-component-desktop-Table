import React, { useRef, useMemo, useEffect, useState } from 'react';
import classnames from 'classnames';
import useColumnsParse from './hooks/useColumnsParse';
import renderTable from './renders/renderTable';
import TableHeader from './components/TableHeader';
import ColGroup from './components/ColGroup';
import computeLayouts, { ColumnWidths } from './utils/computeLayouts';

export type Align = 'left' | 'right' | 'center';

export type LayoutMode = 'tile' | 'stretch';

export type ColumnType = 'checkbox' | 'radio' | 'expand';

export type ColumnFixed = 'left' | 'right';

export interface Column {
  title: string;
  dataIndex: string;
  render?: () => void;
  type?: ColumnType;
  width?: number;
  fixed?: ColumnFixed;
  cannotExpand?: boolean;
  className?: string;
}

export interface TableProps {
  dataSource: {}[];
  columns: Column[];
  className?: string;
  align?: Align;
  layoutMode?: LayoutMode;
  rowKey: string;
  useSplitLayout?: boolean;
  dragAble?: boolean;
  loading?: boolean;
}

interface Layouts {
  totalTableWidth: number;
  fixedLeftTableWidth: number;
  fixedRightTableWidth: number;
  mainTableWidth: number;
  colWidths: ColumnWidths;
}

type UseLayoutsState = [Layouts, React.Dispatch<React.SetStateAction<Layouts>>];

const Table = function Table(props: TableProps) {
  const { columns, className, layoutMode, dragAble, loading, useSplitLayout } = props;
  const containerRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [complete, setComplete] = useState(false);
  const [layouts, setLayouts]: UseLayoutsState = useState(() => ({
    totalTableWidth: 0,
    fixedLeftTableWidth: 0,
    fixedRightTableWidth: 0,
    mainTableWidth: 0,
    colWidths: {},
  }));

  /* computed props */

  // 表格类名
  const _className = useMemo(() => classnames('r-table-container', className), [className]);

  const meta = useColumnsParse(columns);
  // 使用平铺布局
  // TODO: 是否第一次确定后，以后不可更改
  const useTileLayout = meta.hasFixed || dragAble || layoutMode === 'tile';
  // 使用分体式布局
  const _useSplitLayout = meta.hasFixed /* || !!tableHeight */ || useSplitLayout;

  /**
   * 根据用户设置,计算表格列宽 及 总宽度
   * */
  // eslint-disable-next-line no-shadow

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const { allCols, colMinWidths } = meta;
    const _layouts: Layouts = computeLayouts(containerRef.current.clientWidth, allCols, colMinWidths);
    setLayouts(_layouts);
    // TODO
    // this.scrollBarX =
    //   containerWidth - totalTableWidth < Number.EPSILON ? SCROLL_BAR_WIDTH : 0;
    setComplete(true);
  }, [meta]);

  return (
    <div className={_className} ref={containerRef}>
      {renderTable(
        <ColGroup columns={meta.mainCols} colWidths={layouts.colWidths} />,
        <TableHeader columns={columns} />
        // <TableBody columns={columns} />
      )}
    </div>
  );
};

Table.defaultProps = {
  dataSources: [],
  className: undefined,
  layoutMode: 'stretch',
  useSplitLayout: false,
};

export default React.memo(Table);
