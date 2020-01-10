import React from 'react';
import memoizeOne from 'memoize-one';
import PropTypes from 'prop-types';
import Row from './Row';
import { checkType, checkStatus } from './constants';
import cn from './utils/classname';
import SCROLL_BAR_WIDTH from './utils/getScrollBarWidth';
import useBigDataRender from '../big-data-render/hook-same-height';

import Checkbox from '../checkbox';
import tableConfig from './config';

const ASC = '_asc'; // 正序
const DESC = '_desc'; // 反序

const { CHECKED, NOT_CHECKED, HALF_CHECKED } = checkStatus;
const { RADIO, CHECKBOX, NONE } = checkType;

class Table extends React.Component {
  /**
   * 数据预处理
   *
   * */
  initialize(props) {
    this.syncRowMap = {};
    this.tableWidth = { plain: '100%', left: 0, right: 0, total: 0 };

    this.scrollBarY = 0;
    this.scrollBarX = 0;

    // 底部表格高度
    this.bottomTableHeight = 0;

    const propsColumns = [...props.columns];
    const columns = {
      left: [],
      plain: [],
      right: [],
      all: [],
    };
    let tableType = NONE;
    let col = null;
    let type = null;
    let isCheckbox = false;
    let isRadio = false;
    let minWidth = 0;
    for (let i = 0, len = propsColumns.length; i < len; i++) {
      col = { ...propsColumns[i] }; // 拷贝
      type = col.type;
      isCheckbox = type === 'checkbox';
      isRadio = type === 'radio';

      // 记录原始位置
      col.__i__ = i;

      // 最小缩放宽度
      minWidth =
        col.width ||
        (isCheckbox || isRadio || type === 'expand' || type === 'index'
          ? 50
          : null);
      col.minWidth = minWidth; // 最小允许宽度
      col.maxWidthInCol = minWidth; // 一列中最大宽度
      col.firstRenderWidth = minWidth; // 首次渲染后 ， 一列中最大宽度

      // 如果 设置type 或 width 则 禁止展宽
      if (type || col.fixed) {
        col.cannotExpand = true;
      }

      // 根据fixed 属性， 分配
      switch (col.fixed) {
        case 'left':
          columns.left.push(col);
          break;
        case 'right':
          columns.right.push(col);
          break;
        default:
          columns.plain.push(col);
          break;
      }

      columns.all.push(col);

      // 定义表格的类型
      if (tableType === NONE) {
        tableType = isCheckbox ? CHECKBOX : isRadio ? RADIO : NONE;
      }
    }

    this.columns = columns;
    this.checkState = tableType; // 当前表格的类型  带有单选 | 有多选功能  | 无

    this.HAS_LEFT = columns.left.length > 0;
    this.HAS_RIGHT = columns.right.length > 0;
    this.HAS_BOTTOM = props.fixedRows.length > 0;

    this.HAS_FIXED = this.HAS_LEFT || this.HAS_RIGHT;

    // TODO: 是否第一次确定后，以后不可更改
    // 使用平铺布局
    this.USE_TILE_LAYOUT =
      this.HAS_FIXED || props.dragAble || props.type === 'tile';
    // 使用分体式布局
    this.USE_SPLIT_LAYOUT =
      this.HAS_FIXED || !!props.tableHeight || props.useSplitLayout;

    // 首次渲染完成
    if (this.state.complete) {
      return;
    }
    // 第一次渲染有无数据
    this.hasNoData = props.rows.length === 0;
  }

  constructor(props) {
    super(props);

    this.state = {
      complete: false,
    };

    this.containerEl = { current: null };
    this.plainTableBodyTrackEl = { current: null };
    this.plainTableHeadTrackEl = { current: null };

    // 根据columns数据， 进行预处理
    this.initialize(props);

    this.handleBottomMount = this.handleBottomMount.bind(this);
    this.handleRowChecked = this.handleRowChecked.bind(this);
  }

  /**
   * 初次渲染完成后，开始计算布局
   */
  componentDidMount() {
    this.initStructureWhenColumnsUpdated();
  }

  /**
   * 表格数据rows更新后，重新计算布局
   */
  // TODO: 流程待优化
  componentDidUpdate(prevProps) {
    const currentProps = this.props;
    const columnsHasChanged = prevProps.columns !== currentProps.columns;
    const rowsHasChanged = prevProps.rows !== currentProps.rows;

    if (columnsHasChanged) {
      this.initialize(currentProps);
      this.setState(
        {
          complete: false,
          sortMap: { current: '', order: ASC },
        },
        () => {
          // 重新计算
          this.initStructureWhenColumnsUpdated();
        }
      );
    }
    // rows 数据更新后, 重新设置col宽度
    else if (rowsHasChanged) {
      this._initStructure();
      this.forceUpdate();
    }
  }

  /**
   * 当 columns 数据更新且渲染后，重新计算结构信息
   *
   * */
  initStructureWhenColumnsUpdated() {
    this._initStructure();
    // 首次渲染完成
    setTimeout(() => {
      this.setState({ complete: true }, () => {
        // 当有fixedBottomTable时， 因为要获取bottom table高度
        // 然后用于设置fixedLeft  fixedRight table高度， 此时会影响滚动条
        // 所以再初始化结构后 在计算一次有没有滚动条
        setTimeout(() => {
          this.analyseScroll();
        });
      });
    });
  }

  /**
   * 收集th col 的最小宽度
   * @param {*} col
   * @param {*} el
   */
  onThMount(col, el) {
    // cannotExpand 不需要根据dom元素设置宽度，因为肯定已经有了
    // 如果已设置col.width 则以col.width作为最小宽度， 也不需要设置
    if (
      !el ||
      this.state.complete ||
      col.width ||
      (col.cannotExpand && col.width)
    ) {
      return;
    }
    const domWidth = el.offsetWidth + 5;
    col.minWidth = domWidth;
    col.maxWidthInCol = domWidth; // 一列中最大宽度
    col.firstRenderWidth = domWidth;
  }

  /**
   * 判断有没有竖直方向滚动条
   * 只有 this.USE_SPLIT_LAYOUT 分体式布局 才需要这些操作
   * */
  analyseScroll() {
    const track = this.plainTableBodyTrackEl.current;
    if (track) {
      this.scrollBarY = track.offsetWidth - track.clientWidth;
      // this.HAS_FIXED
      if (this.USE_TILE_LAYOUT) {
        this.scrollBarX = track.offsetHeight - track.clientHeight;
      }
    }
  }

  /*
   * 计算表格结构，滚动条等
   * */
  _initStructure() {
    // 初始化 横向结构, 列宽,
    this.analyseScroll();
    if (!this.USE_TILE_LAYOUT) {
      return;
    }
    this.computeColWidth();
  }

  /**
   * 根据用户设置,计算表格列宽 及 总宽度
   * */
  computeColWidth() {
    // 容器宽度（物理宽度）
    let hasZero = 0;
    let totalWidth = 0;
    const cannotExpandMap = {};
    let cannotExpandTotalWidth = 0;
    const columns = this.columns.all;
    const containerWidth =
      this.containerEl.current.clientWidth - this.scrollBarY;

    // - 将maxColWidthList所有值相加，得出总宽度（计算总宽度）
    // - 记录maxColWidthList中为0的项的数量
    // - 将不允许扩展宽度的列的宽度相加
    // - 记录不允许扩展宽度列的索引
    (function() {
      let colWidth = 0;
      for (let i = 0, len = columns.length; i < len; i++) {
        colWidth = columns[i].maxWidthInCol;

        if (colWidth === 0) {
          hasZero++;
        }

        if (columns[i].cannotExpand) {
          cannotExpandTotalWidth += colWidth;
          cannotExpandMap[i] = true;
        }

        totalWidth += colWidth;
      }
    })();

    // 如果表格 物理宽度 大于 计算宽度   diff > 0
    const diff = containerWidth - totalWidth;
    let plainW = 0;
    let leftW = 0;
    let rightW = 0;
    let fixed = null;
    let minWidth = 0; // minColWidthList的项
    let lastWidth = 0; // 最终计算出的列宽
    let maxWidthInCol = 0;
    let minWidthExact = 0; // 计算出的每列最小宽度

    const allColumns = columns.map((col, i) => {
      minWidth = col.minWidth;
      maxWidthInCol = col.maxWidthInCol;

      // 对于像 checkbox|expand 这种列，没有获取节点的最小宽度,  其最小宽度
      // 在初始化时(constructor中) 已经被设置了,比较th的宽度 和 td的宽度，哪个宽用哪个
      minWidthExact = minWidth < maxWidthInCol ? maxWidthInCol : minWidth;

      lastWidth = minWidthExact;

      if (diff > 0) {
        // 需要自动扩展 列宽
        if (hasZero) {
          // 存在 没有设置宽度的 列  ==>>  将多余的平均分配
          if (maxWidthInCol === 0) {
            lastWidth = diff / hasZero;
          }
        } else {
          // 不存在 没有设置宽度的列  ==>>  除了不允许扩展的列, 其他均匀分配 多出的
          if (!cannotExpandMap[i]) {
            lastWidth =
              maxWidthInCol +
              diff * (maxWidthInCol / (totalWidth - cannotExpandTotalWidth));
          }
        }
        // 最小宽度
        lastWidth < minWidthExact && (lastWidth = minWidthExact);
      }

      fixed = col.fixed;

      if (fixed === 'left') {
        leftW += lastWidth;
      } else if (fixed === 'right') {
        rightW += lastWidth;
      } else {
        plainW += lastWidth;
      }

      col.maxWidthInCol = lastWidth;

      return col;
    }); // End forEach

    const totalW = leftW + rightW + plainW;

    // -5 只是一个大概值，因为js计算有误差，不能以 0 作为判断
    this.scrollBarX = containerWidth - totalW < 0 ? SCROLL_BAR_WIDTH : 0;

    this.tableWidth = {
      left: leftW,
      right: rightW,
      plain: plainW,
      total: totalW,
    };

    this.columns = { ...this.columns, all: allColumns };
  }

  /**
   * 固定在底部的表格mounted之后会触发该事件
   * */
  handleBottomMount(el) {
    if (!el) {
      return;
    }
    this.bottomTableEl = el;
    this.bottomTableHeight = el.clientHeight;
  }
}

const noWork = () => null;

Table.defaultProps = {
  columns: [],
  type: 'stretch',
  align: 'center',
  fixedRows: [],
  rows: [],
  rowKey: 'key',
  dragAble: false, // 允许用户拖拽设置表格列宽
  databaseSort: false, // 是否使用数据库排序, 默认是表格自动排序
  useSplitLayout: false, // 使用分体布局
  onSortChange: noWork,

  onRow: () => ({
    height: 60,
  }),

  onHeaderRow: () => ({ height: 60 }),

  bigDataRenderRange: 30, // 大数据渲染 一屏的数据范围
  rowSelection: {
    onChange: noWork,
    getCheckboxProps: noWork,
    selectedRowKeys: [],
  },
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      prop: PropTypes.string,
      type: PropTypes.oneOf(['checkbox', 'radio', 'expand', 'index']),
      fixed: PropTypes.oneOf(['left', 'right']),
      render: PropTypes.func,
    })
  ), // 列配置
  tableHeight: PropTypes.number, // 表格体高度
  type: PropTypes.oneOf(['tile', 'stretch']), // 平铺 拉伸布局

  useSplitLayout: PropTypes.bool, // 使用分体布局
  zebra: PropTypes.bool, // 是否需要斑马线
  loading: PropTypes.bool, // 控制表格显示loading
  dragAble: PropTypes.bool, // 禁用设置表格列宽
  databaseSort: PropTypes.bool, // 排序方式，表格自身排序 | 数据库排序（有onSortChange事件）

  onSortChange: PropTypes.func, // 选择数据库排序，排序变化时触发

  emptyTip: PropTypes.node, // 定义表格为空数据时要显示的提示
  align: PropTypes.oneOf(['left', 'right', 'center']), // 表格内文本对齐
  rows: PropTypes.array,
  fixedRows: PropTypes.array,
  rowKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 表格行 key 的取值，可以是字符串或数值

  onHeaderRow: PropTypes.func,
  onRow: PropTypes.func, // 在Row 创建之前被调用，要求返回对象， 对象中的每个键将作为props传给 Row

  rowSelection: PropTypes.shape({
    onChange: PropTypes.func,
    selectedRowKeys: PropTypes.array, // 表格行选中改变
    getCheckboxProps: PropTypes.func,
  }),

  bigDataRenderRange: PropTypes.number, // 大数据渲染 一屏的数据范围
};

export default Table;
