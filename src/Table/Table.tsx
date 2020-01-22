import React, { useMemo } from 'react';
import classnames from 'classnames';
import TableHeader from './TableHeader';
import ColGroup from './ColGroup';
import useLayouts from './useLayouts';
import TableBodyBase, { RowDataSource } from './TableBodyBase';
import useTableConfig from './useTableConfig';
import useColumnsParser from './useColumnsParser';
import SplitTable from './SplitTable';
import './style.less';

export type Align = 'left' | 'right' | 'center';

export type LayoutMode = 'tile' | 'stretch';

export type ColumnType = 'checkbox' | 'radio' | 'expand';

export type ColumnFixed = 'left' | 'right';

export interface Column {
  title?: string;
  dataIndex?: string;
  render?: () => void;
  type?: ColumnType;
  width?: number;
  fixed?: ColumnFixed;
  cannotExpand?: boolean;
  className?: string;
}

export interface TableProps {
  /* 布局 */
  align?: Align;
  columns: Column[];
  dragAble?: boolean;
  width?: number;
  height?: number;
  layoutMode?: LayoutMode;

  /* 其它 */
  className?: string;
  dataSource: RowDataSource[];
  rowKey: string;
  loading?: boolean;
}

const defaultProps = {
  dataSources: [],
  className: undefined,
  layoutMode: 'stretch',
};

type DefaultProps = Readonly<typeof defaultProps>;

const Table = (props: TableProps & DefaultProps) => {
  const {
    columns,
    dragAble,
    width,
    height,
    layoutMode,

    /*  */
    className,
    dataSource,
    rowKey,
  } = props;

  const {
    allCols,
    colMinWidths,
    mainCols,
    fixedLeftCols,
    fixedRightCols,
  } = useColumnsParser(columns);

  const hasLeft = fixedLeftCols.length > 0;

  const hasRight = fixedRightCols.length > 0;

  const hasFixed = hasLeft || hasRight;

  // 使用平铺布局
  // TODO: 是否第一次确定后，以后不可更改
  const useTileLayout = hasFixed || dragAble || layoutMode === 'tile';

  const { clsPrefix } = useTableConfig();

  const [containerRef, layouts] = useLayouts(
    allCols,
    colMinWidths,
    useTileLayout,
    width
  );

  const {
    colWidths,
    totalTableWidth,
    mainTableWidth,
    fixedLeftTableWidth,
    fixedRightTableWidth,
  } = layouts;

  const colGroup = useMemo(
    () => (
      <ColGroup
        columns={mainCols}
        colMinWidths={colMinWidths}
        colWidths={useTileLayout ? colWidths : colMinWidths}
      />
    ),
    [colMinWidths, colWidths, mainCols, useTileLayout]
  );

  const tHead = <TableHeader columns={mainCols} />;

  const tBody = (
    <TableBodyBase columns={mainCols} dataSource={dataSource} rowKey={rowKey} />
  );

  const render = () => {
    return (
      <SplitTable
        colGroup={colGroup}
        tHead={tHead}
        tBody={tBody}
        height={height}
        totalTableWidth={totalTableWidth}
        mainTableWidth={mainTableWidth}
        fixedLeftTableWidth={fixedLeftTableWidth}
      />
    );
  };

  // 表格类名
  const _className = useMemo(
    () => classnames(`${clsPrefix}-table-container`, className),
    [className, clsPrefix]
  );

  return (
    <div className={_className} ref={containerRef}>
      {render()}
    </div>
  );
};

Table.defaultProps = defaultProps;

export default React.memo(Table);
