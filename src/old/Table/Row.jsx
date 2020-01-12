/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ExpandRow from './expand-row';
import Checkbox from './checkbox';
import tableConfig from './config';
import Subject from './Subject';

const HOVER = 'HOVER';
const EXPAND = 'EXPAND';
const EXPAND_HEIGHT = 'EXPAND_HEIGHT';

const isIE9 = /MSIE 9/i.test(window.navigator.usergent);

const Row = React.memo(
  ({
    className,
    isBottom,
    rowData,
    bgColor,
    needSync,
    isFixed,
    columns,
    rowSelection,
    rowIndex,
    rowKey,
  }) => {
    const [isHover, setIsHover] = useState(false);
    const [isCollapse, setIsCollapse] = useState(true);
    const [expandTrHeight, setExpandTrHeight] = useState(0);
    const [expandContent, setExpandContent] = useState(null);
    const expandTrRef = useRef();

    const toggleRowBG = useCallback(
      isOn => {
        setIsHover(isOn > 0);
        if (needSync) {
          this.syncObj.emit(HOVER, isOn > 0, this);
        }
      },
      [needSync]
    );
    const handleMouseLeave = useCallback(() => {
      toggleRowBG(-1);
    }, [toggleRowBG]);
    const handleMouseEnter = useCallback(() => {
      toggleRowBG(1);
    }, [toggleRowBG]);

    const handleRowExpand = useCallback(() => {
      const _isCollapse = !isCollapse;
      if (needSync) {
        this.syncObj.emit(
          EXPAND,
          { isCollapse: _isCollapse, expandContent },
          this
        );
      }
      setIsCollapse(_isCollapse);
      setExpandContent(isFixed ? null : expandContent);
    }, [expandContent, isCollapse, isFixed, needSync]);

    useEffect(() => {
      if (isFixed || isCollapse || !needSync) {
        return;
      }
      // this.expandTr.current.clientHeight  在ie9中获取不到值
      // .getBoundingClientRect().height    在普通浏览器中又获取不到值
      const el = expandTrRef.current;
      const height = isIE9
        ? el.getBoundingClientRect().height
        : el.clientHeight;
    }, [isCollapse, isFixed, needSync]);

    /* RENDER */
    const renderTdContentWrap = useCallback(child => {
      const title =
        typeof child === 'string' || typeof child === 'number' ? child : '';

      return (
        <div title={title} className="r-td-content">
          {child}
        </div>
      );
    }, []);

    const renderTdContent = useCallback(
      column => {
        const { dataIndex, type, content, render } = column;
        const { ArrowDown } = tableConfig.icon;

        if (isBottom) {
          return renderTdContentWrap(rowData[type || dataIndex] || null);
        }

        if (type === 'checkbox') {
          return (
            <Checkbox
              value={rowKey}
              rowData={rowData}
              rowIndex={rowIndex}
              getCheckboxProps={rowSelection.getCheckboxProps}
              checkedIcon={tableConfig.icon.Check}
              notCheckedIcon={tableConfig.icon.NotCheck}
            />
          );
        }

        if (type === 'radio') {
          return null;
        }

        if (type === 'expand') {
          return (
            <ArrowDown
              className={`_expand-btn ${isCollapse ? '_right' : '_down'}`}
              onClick={handleRowExpand}
            />
          );
        }

        if (!rowData[dataIndex] && rowData[dataIndex] !== 0 && !!render) {
          // 如果没有值，则不渲染
          return null;
        }

        if (render) {
          const _content = render(rowData[dataIndex], { ...rowData }, rowIndex);
          return renderTdContentWrap(_content);
        }
        return renderTdContentWrap(rowData[dataIndex]);
      },
      [
        handleRowExpand,
        isBottom,
        isCollapse,
        renderTdContentWrap,
        rowData,
        rowIndex,
        rowKey,
        rowSelection.getCheckboxProps,
      ]
    );

    const renderTds = useCallback(() => {
      return columns.map(column => {
        const { type, className: colClassName, align, dataIndex } = column;
        const _className = classnames(
          'r-td',
          type && '_align-center',
          !type && align && `_align-${align}`,
          colClassName
        );
        return (
          <td
            key={column.colKey}
            className={_className}
            // onClick={this.clickRow.bind(this, j, dataIndex)}
          >
            {renderTdContent(column)}
          </td>
        );
      });
    }, [columns, renderTdContent]);

    if (!rowData) {
      return null;
    }

    if (isBottom) {
      return <tr className="r-tr">{renderTds(columns)}</tr>;
    }

    const _className = classnames(
      'r-tr',
      bgColor,
      isHover && '_active',
      className
    );
    return (
      <>
        <tr
          className={_className}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          {renderTds(columns)}
        </tr>
        {!isCollapse && (
          <tr
            className="r-expand-tr"
            ref={expandTrRef}
            style={isFixed ? { height: expandTrHeight } : null}
          >
            <td colSpan={columns.length} className="r-expand-td">
              {isFixed && (
                <ExpandRow content={expandContent} rowData={rowData} />
              )}
            </td>
          </tr>
        )}
      </>
    );
  }
);

Row.defaultProps = {
  className: undefined,
  isBottom: false,
  rowData: {},
  bgColor: undefined,
  needSync: false,
  isFixed: false,
};

Row.propTypes = {
  className: PropTypes.string,
  bgColor: PropTypes.string,
  isBottom: PropTypes.bool,
  needSync: PropTypes.bool,
  isFixed: PropTypes.bool,
  rowData: PropTypes.any,
  columns: PropTypes.any.isRequired,
};

export default Row;
