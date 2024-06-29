import styled from "styled-components";

export const SectionStyled = styled.div`
  width: 100%;
  margin-top: 16px;
  position: relative;

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    padding: 6px 0;

    .dataTitle {
      flex: 1;
      text-align: center;
    }
  }

  .h-full {
    height: 100%;
  }

  .ant-table-thead > tr > th {
    padding: 0;
  }

  .text-red {
    color: red;
  }

  .cell-error {
    background-color: rgba(217, 155, 255, 0.4) !important;
  }

  .table-header-cell {
    padding: 16px;
  }

  .btn-export {
    position: fixed;
    right: 32px;
    bottom: 25px;
    z-index: 100000;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    box-shadow: 1px 1px 4px rgba(68, 68, 68, 0.2);
    border-radius: 5px;
    margin: 0 5px;
    padding: 9px 35px;
    color: #777777;
    font-size: 13px;
    text-align: center;
    font-weight: 400;
    cursor: pointer;
  }
`;
