import React, { useMemo } from 'react';
import classnames from 'classnames';
import TableBase from './TableBase';
import TableHeader from './TableHeader';
import ColGroup from './ColGroup';
import useLayouts from './useLayouts';
import TableBodyBase, { RowDataSource } from './TableBodyBase';
import useTableConfig from './useTableConfig';
import useColumnsParser from './useColumnsParser';
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
  useSplitLayout?: boolean;

  /* 其它 */
  className?: string;
  dataSource: RowDataSource[];
  rowKey: string;
  loading?: boolean;
}

const Table = (props: TableProps) => {
  const {
    align,
    columns,
    dragAble,
    width,
    layoutMode,
    useSplitLayout: _useSplitLayout,

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

  // 使用分体式布局
  const useSplitLayout = hasFixed /* || !!tableHeight */ || _useSplitLayout;

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

  console.log('colWidths', colWidths);

  // 表格类名
  const _className = useMemo(
    () => classnames(`${clsPrefix}-table-container`, className),
    [className, clsPrefix]
  );

  const renderSplitTable = () => {
    const colGroup = (
      <ColGroup
        columns={mainCols}
        colMinWidths={colMinWidths}
        colWidths={colWidths}
      />
    );

    const tHead = <TableHeader columns={mainCols} />;

    const tBody = (
      <TableBodyBase
        columns={mainCols}
        dataSource={dataSource}
        rowKey={rowKey}
      />
    );

    return (
      <div>
        <div>
          <TableBase colGroup={colGroup} tHead={tHead} />
        </div>
        <div>
          <TableBase colGroup={colGroup} tBody={tBody} />
        </div>
      </div>
    );
  };

  const renderNormalTable = () => {
    const colGroup = (
      <ColGroup
        columns={mainCols}
        colMinWidths={colMinWidths}
        colWidths={colMinWidths}
      />
    );

    const tHead = <TableHeader columns={mainCols} />;

    const tBody = (
      <TableBodyBase
        columns={mainCols}
        dataSource={dataSource}
        rowKey={rowKey}
      />
    );

    return <TableBase colGroup={colGroup} tHead={tHead} tBody={tBody} />;
  };

  const render = useSplitLayout ? renderSplitTable : renderNormalTable;

  return (
    <div className={_className} ref={containerRef}>
      {render()}
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
