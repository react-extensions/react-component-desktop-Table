import React, { useCallback, useRef, useEffect } from 'react';
import propTypes from 'prop-types';
import Row from './Row';
import { useMountedState } from './hooks';

const Table = React.memo(function Table({ columns, dataSource }) {
  // 保存cell的宽度
  const cellRef = useRef([]);
  // container el 的引用
  const containerRef = useRef();
  // cell加载，获取宽度
  const onCellMounted = useCallback(el => {
    if (!el) {
      return;
    }
    cellRef.current[el.dataset.key] = el.offsetWidth;
    if (cellRef.current.length !== columns.length) {
      // 还没完全渲染完成
      return;
    }
    console.log(1);
  }, []);

  /**
   * 根据用户设置,计算表格列宽 及 总宽度
   * */
  const computeColWidth = useCallback(() => {
    
  }, []);

  useEffect(() => {
    computeColWidth();
  }, [computeColWidth]);

  return (
    <div className="x-table-container" ref={containerRef}>
      <div className="x-table">
        <div className="x-table-head-track">
          <div className="x-table-head">
            <div className="x-table-tr">
              {columns.map(({ title, dataIndex }, index) => (
                <div className="x-table-th" key={dataIndex}>
                  <span
                    className="x-table-cell"
                    ref={onCellMounted}
                    data-key={index}
                  >
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="x-table-body-track">
          <div className="x-table-body">
            {dataSource.map(data => (
              <Row key={data.id} data={data} columns={columns} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

Table.defaultProps = {
  columns: [],
  dataSource: {},
};
Table.propTypes = {
  columns: propTypes.array,
  dataSource: propTypes.array,
};

export default Table;
