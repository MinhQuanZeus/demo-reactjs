import { Empty, Table, Typography } from "antd";
import classNames from "classnames";
import ResizeObserver from "rc-resize-observer";
import React, { useEffect, useRef, useState } from "react";
import { VariableSizeGrid as Grid } from "react-window";
import { TableProps } from "antd/es";
import SectionStyled from "./styles";
import { DEFAULT_TABLE_COL_WIDTH } from "constants/common";
import { AnyObject } from "interfaces";

const VirtualTable = <RecordType extends object>(props: TableProps<RecordType>) => {
  const { columns, scroll } = props;
  const [tableWidth, setTableWidth] = useState(0);

  const mergedColumns = columns!.map((column) => {
    if (column.width) {
      return column;
    }

    return {
      ...column,
      width: DEFAULT_TABLE_COL_WIDTH,
    };
  });

  const gridRef = useRef<any>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, "scrollLeft", {
      get: () => {
        if (gridRef.current) {
          return gridRef.current?.state?.scrollLeft;
        }
        return null;
      },
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (rawData: object[], { scrollbarSize, ref, onScroll }: any) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;

    if (!rawData.length) {
      const emptyText = props.locale?.emptyText as string;
      return <div className="empty-data">{emptyText ? emptyText : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}</div>;
    }

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index: number) => {
          const { width } = mergedColumns[index];
          return totalHeight > scroll!.y! && index === mergedColumns.length - 1 ? (width as number) - scrollbarSize - 1 : (width as number);
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }: { scrollLeft: number }) => {
          onScroll({ scrollLeft });
        }}
      >
        {({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: React.CSSProperties }) => {
          const record: AnyObject = rawData[rowIndex];
          const column: AnyObject = (mergedColumns as any)[columnIndex];
          const value = record[(mergedColumns as any)[columnIndex].dataIndex];
          if (column.render) {
            return <div style={style}>{column.render(value, record)}</div>;
          }

          return (
            <div
              className={classNames("virtual-table-cell", {
                "virtual-table-cell-last": columnIndex === mergedColumns.length - 1,
              })}
              style={style}
            >
              <Typography.Text ellipsis>{value}</Typography.Text>
            </div>
          );
        }}
      </Grid>
    );
  };

  return (
    <SectionStyled>
      <ResizeObserver
        onResize={({ width }) => {
          setTableWidth(width);
        }}
      >
        <Table
          {...props}
          className="virtual-table"
          columns={mergedColumns}
          pagination={false}
          components={{
            body: renderVirtualList as any,
          }}
        />
      </ResizeObserver>
    </SectionStyled>
  );
};

export default VirtualTable;
