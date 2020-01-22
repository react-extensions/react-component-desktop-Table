import React, { useRef, useCallback, useState } from 'react';
import TableBase from './TableBase';

interface SplitTableProps {
  height?: number;
  totalTableWidth: number;
  mainTableWidth: number;
  fixedLeftTableWidth: number;
  colGroup: React.ReactNode;
  tHead: React.ReactNode;
  tBody: React.ReactNode;
}

const defaultProps = {
  //   height: 'auto',
};

// type DefaultProps = Readonly<typeof defaultProps>;

const SplitTable = ({
  totalTableWidth,
  mainTableWidth,
  fixedLeftTableWidth,
  colGroup,
  tHead,
  tBody,
  height,
}: SplitTableProps) => {
  const [isScroll, setIsScroll] = useState(false);
  const mainHeaderRef = useRef<HTMLDivElement | null>(null);

  const handleMainBodyScroll = useCallback(e => {
    if (!mainHeaderRef.current) {
      return;
    }
    mainHeaderRef.current.scrollLeft = e.target.scrollLeft;
  }, []);

  const handleMainBodyMount = useCallback(el => {
    if (el === null) {
      return;
    }
    setIsScroll(el.scrollHeight !== el.clientHeight);
  }, []);

  return (
    <>
      <div className="split-table">
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            overflowX: 'hidden',
            overflowY: isScroll ? 'scroll' : 'hidden',
            width: '100%',
          }}
          ref={mainHeaderRef}
          onScroll={handleMainBodyScroll}
        >
          <div
            style={{
              width: totalTableWidth,
              position: 'relative',
            }}
          >
            <TableBase
              colGroup={colGroup}
              tHead={tHead}
              style={{
                width: mainTableWidth,
                position: 'relative',
                left: fixedLeftTableWidth,
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 25,
            left: 0,
            overflow: 'auto',
            width: '100%',
            height,
          }}
          ref={handleMainBodyMount}
          onScroll={handleMainBodyScroll}
        >
          <div
            style={{
              width: totalTableWidth,
              position: 'relative',
            }}
          >
            <TableBase
              colGroup={colGroup}
              tBody={tBody}
              style={{
                width: mainTableWidth,
                position: 'relative',
                left: fixedLeftTableWidth,
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="fixed-left-table"
        style={{ position: 'absolute', left: 0, top: 0 }}
      >
        <div className="split-table-header">
          <table />
        </div>
        <div className="split-table-body">
          <table />
        </div>
      </div>
      {/*
  <div className="fixed-right-table">
    <div className="split-table-header">
      <table />
    </div>
    <div className="split-table-body">
      <table />
    </div>
  </div> */}
    </>
  );
};

SplitTable.defaultProps = defaultProps;

export default React.memo(SplitTable);
