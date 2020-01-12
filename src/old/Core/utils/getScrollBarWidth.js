// 滚动条宽度
export default function getScrollBarWidth() {
  const div = document.createElement('div');
  div.setAttribute(
    'style',
    'overflow:scroll;width: 100px;height:1px;visibility:hidden;position:fixed;z-index:-99;'
  );
  div.innerHTML = `<div style="height:10px"></div>`;
  document.body.appendChild(div);
  const barWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  return barWidth;
}
