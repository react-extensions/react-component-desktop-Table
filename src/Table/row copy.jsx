import React from 'react';
import PropTypes from 'prop-types';
import ExpandRow from './expand-row';
import Checkbox from './checkbox';
import cn from './utils/classname';
import tableConfig from './config';
import Subject from './Subject';

const HOVER = 'HOVER';
const HEIGHT = 'HEIGHT';
const EXPAND = 'EXPAND';
const EXPAND_HEIGHT = 'EXPAND_HEIGHT';

const isIE9 = /MSIE 9/i.test(window.navigator.usergent);

const renderTdContentWrap = (col, child) => {
  const title =
    typeof child === 'string' || typeof child === 'number' ? child : '';
  return (
    <div title={title} className={cn('r-td-content', col.width ? '_fill' : '')}>
      {child}
    </div>
  );
};

const renderTdContent = col => {
  const { rowData, rowIndex, rowKey, isBottom, rowSelection } = this.props;
  const { isCollapse } = this.state;
  const { ArrowDown } = tableConfig.icon;

  if (isBottom) {
    return renderTdContentWrap.call(
      this,
      col,
      rowData[col.type || col.prop] || null
    );
  }

  if (col.type === 'checkbox') {
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

  if (col.type === 'radio') {
    return null;
  }

  if (col.type === 'expand') {
    return (
      <ArrowDown
        className={`_expand-btn ${isCollapse ? '_right' : '_down'}`}
        onClick={this.expand.bind(this, col.content)}
      />
    );
  }

  return (
    (rowData[col.prop] || rowData[col.prop] === 0 || col.render) &&
    renderTdContentWrap.call(
      this,
      col,
      col.render
        ? col.render(rowData[col.prop], { ...rowData }, rowIndex)
        : rowData[col.prop]
    )
  );
};

const mapRow = () => {
  return this.props.columns.map((col, j) => {
    return (
      <td
        key={j}
        className={cn(
          'r-td',
          col.type ? '_align-center' : col.align ? `_align-${col.align}` : '',
          col.className
        )}
        onClick={this.clickRow.bind(this, j, col.prop)}
      >
        {renderTdContent.call(this, col)}
      </td>
    );
  });
};

class Row extends React.Component {
  constructor(props) {
    super(props);

    // 创建Subject对象
    let syncObj = props.syncRowMap[props.rowKey];

    if (props.needSync) {
      this.expandTr = React.createRef();
      if (!syncObj) {
        syncObj = new Subject(props.height);
        props.syncRowMap[props.rowKey] = syncObj;
      }
      this.removeObjserver = syncObj.addObserver(this);
      this.syncObj = syncObj;
    }

    this.state = {
      isCollapse: true, // 折叠
      expandContent: null, // 扩展行内容
      expandTrHeight: 0, // 扩展行 高度
      isHover: false, // 鼠标移入
      trHeight: syncObj ? syncObj.height : props.height || null, // 行宽度
    };
    this.getTrHeight = this.getTrHeight.bind(this);
  }

  componentWillUnmount() {
    this.removeObjserver &&
      this.removeObjserver(len => {
        if (len === 0) {
          delete this.props.syncRowMap[this.props.rowKey];
        }
      });
  }

  /**
   * 更新同步数据
   * @param {*} key
   * @param {*} value
   */
  updateSync(key, value) {
    /* eslint-disable */
    switch (key) {
      case HEIGHT:
        this.setState({ trHeight: value });
        break;
      case HOVER:
        this.setState({ isHover: value });
        break;
      case EXPAND:
        this.setState(
          {
            isCollapse: value.isCollapse,
            expandContent: this.props.isFixed ? null : value.expandContent,
          },
          this.getExpandRowHeight
        );
        break;
      case EXPAND_HEIGHT:
        this.setState({ expandTrHeight: value });
        break;
    }
    /* eslint-enable */
  }

  /**
   * 获取tr高度
   * @param {*} el
   */
  getTrHeight(el) {
    if (!el) {
      return;
    }
    const height = el.clientHeight;
    if (this.syncObj.height !== height) {
      this.syncObj.emit(HEIGHT, height, this);
    }
  }

  /**
   * 点击表格单元格
   * */
  clickRow(colIndex, prop, e) {
    const props = this.props;
    props.onClick(e, props.rowData, props.rowIndex, prop, colIndex);
  }

  // 具有扩展功能的表格
  expand(expandContent, e) {
    // 阻止触发 click
    e.stopPropagation();
    const props = this.props;
    const isCollapse = !this.state.isCollapse;

    if (props.needSync) {
      this.syncObj.emit(EXPAND, { isCollapse, expandContent }, this);
    }

    this.setState(
      {
        isCollapse: isCollapse,
        expandContent: props.isFixed ? null : expandContent,
      },
      this.getExpandRowHeight
    );
  }

  /**
   * 获取
   */
  getExpandRowHeight() {
    if (this.props.isFixed || this.state.isCollapse || !this.props.needSync) {
      return;
    }
    //this.expandTr.current.clientHeight  在ie9中获取不到值
    //.getBoundingClientRect().height    在普通浏览器中又获取不到值
    const el = this.expandTr.current;
    const height = isIE9 ? el.getBoundingClientRect().height : el.clientHeight;
    this.syncObj.emit(EXPAND_HEIGHT, height, this);
  }

  render() {
    const {
      isHover,
      trHeight,
      isCollapse,
      expandTrHeight,
      expandContent,
    } = this.state;

    const {
      className,
      isBottom,
      rowData,
      bgColor,
      needSync,
      isFixed,
      columns,
    } = this.props;

    if (!rowData) {
      return null;
    }

    if (isBottom) {
      return (
        <tr
          className="r-tr"
          ref={this.getTrHeight}
          style={{ height: trHeight }}
        >
          {this.mapRow()}
        </tr>
      );
    }

    return (
      <>
        <tr
          className={cn('r-tr', bgColor, isHover && '_active', className)}
          ref={needSync && !isFixed && this.getTrHeight.bind(this)}
          onMouseLeave={this.toggleRowBG.bind(this, -1)}
          onMouseEnter={this.toggleRowBG.bind(this, 1)}
          style={{ height: trHeight }}
        >
          {mapRow.call(this)}
        </tr>
        {!isCollapse && (
          <tr
            className="r-expand-tr"
            ref={this.expandTr}
            style={isFixed ? { height: expandTrHeight } : null}
          >
            <td colSpan={columns.length} className="r-expand-td">
              {!isFixed ? (
                <ExpandRow content={expandContent} rowData={rowData} />
              ) : null}
            </td>
          </tr>
        )}
      </>
    );
  }
}

const noWork = () => undefined;
Row.defaultProps = {
  onClick: noWork,
  height: 60,
};

Row.propTypes = {
  onClick: PropTypes.func,
  height: PropTypes.number,
};

export default Row;
