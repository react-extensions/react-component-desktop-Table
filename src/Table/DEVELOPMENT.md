#### 首次渲染

- 无 columns，啥都不渲染
- 有数据
  - render: 标识符 didMount 为 false，只渲染表头，整体为 absolute，透明度为 1
  - mounted: 标识符 didMount 为 true，开始计算布局
  
