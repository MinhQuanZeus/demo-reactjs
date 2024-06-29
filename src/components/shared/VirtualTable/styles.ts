import styled from "styled-components";

export default styled.section`
  .virtual-table .ant-table-container:before,
  .virtual-table .ant-table-container:after {
    display: none;
  }

  .virtual-table-cell {
    box-sizing: border-box;
    padding: 16px;
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    border-right: 1px solid rgba(229, 229, 229, 1);
    background: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    white-space: nowrap;

    .rowNumber {
      display: flex;
      justify-content: space-between;

      .rowIndex {
        flex: 1;
        text-align: right;
      }
    }
  }

  [data-theme="dark"] .virtual-table-cell {
    box-sizing: border-box;
    padding: 16px;
    border: 1px solid #303030;
    background: #141414;
  }

  .empty-data {
    height: 700px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    border: 1px solid rgba(229, 229, 229, 1);
  }
`;
