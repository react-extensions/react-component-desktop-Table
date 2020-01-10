import React from 'react';
// import tableConfig from '../config';

/**
 * 渲染普通的 TH 元素
 * */
export default function renderPlainTh(onThMount, col) {
  const { title, __i__ } = col;
  return (
    <>
      <span ref={onThMount} data-key={__i__} className="r-th-content">
        {title}
      </span>
    </>
  );
}
