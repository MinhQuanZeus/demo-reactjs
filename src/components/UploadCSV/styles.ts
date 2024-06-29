import styled from "styled-components";

export const SectionStyled = styled.div`
  margin: 8px 16px;

  .text-content {
    font-size: 11px;
    color: #777777;
  }

  .ant-upload.ant-upload-drag {
    background: none !important;
    border: none !important;
  }

  .wrap-button-upload {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }

  .icon {
    font-size: 40px;
    color: #ffffff;
  }

  .ant-upload-text {
    font-size: 13px;
    text-align: center;
    color: #424242;
  }

  .form-upload {
    .form-upload-border {
      border: 2px solid #ffffff;
    }

    .ant-upload-list {
      display: none;
    }

    .file-upload {
      display: flex;
      flex-direction: column;
      min-height: 160px;
      border: 2px dashed #608ec6;
      background-color: #eff4ff;
      justify-content: center;

      .info-file {
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 15px 0;
        padding: 16px;
        position: relative;

        .name-image {
          font-size: 13px;
          text-align: center;
          margin-bottom: 10px;
          color: #424242;
        }

        .image-file {
          height: 338px;
        }

        .ant-image-mask {
          .zoom-image {
            font-size: 18px;
            color: #c4c4c4;
            position: absolute;
            right: 20px;
            bottom: 20px;
            z-index: 99;
            cursor: pointer;
          }
        }
      }
    }
  }

  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-delete {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 20px;

    .icon-delete-outlined {
      color: #00a3a5;
      font-size: 15px;
      margin-right: 5px;
    }

    .text-delete-outlined {
      font-size: 12px;
      text-decoration: underline;
      color: #00989a;
    }
  }

  .btn-upload {
    background: #ffffff;
    border: 1px solid #00a3a5;

    box-shadow: 1px 1px 4px rgba(68, 68, 68, 0.2);
    border-radius: 5px;

    font-weight: bold;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #00a3a5;
    padding: 6px 36px;
    cursor: pointer;
  }

  .text-download-template {
    font-size: 13px;
    text-align: right;
    margin: 10px 0;
    text-decoration: underline;
    color: #00a3a5;
    cursor: pointer;

    .icon {
      color: #00a3a5;
      font-size: 16px;
      margin-right: 5px;
    }
  }

  .error-message {
    background-color: #fffaf9;
    border: 1px solid rgba(240, 51, 10, 0.8);
    border-radius: 2px;
  }

  .error-message-title {
    margin-top: 6px;
    border-bottom: 1px solid rgba(240, 51, 10, 0.8);

    .text-title {
      font-size: 16px;
      text-align: center;
      color: #f0330a;
      margin: 0;

      .icon {
        font-size: 20px;
        color: #f0330a;
        margin-right: 8px;
      }
    }

    .text-subtitle {
      font-size: 13px;
      text-align: center;
      color: #f0330a;
    }
  }

  .error-message-content {
    padding-top: 20px;

    .text-content {
      font-size: 13px;
      color: #f0330a;
    }
  }

  .text-successful {
    font-size: 16px;
    color: #424242;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      font-size: 28px;
      color: #08a3a5;
      margin-right: 10px;
    }
  }

  .sub-title {
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #424242;

    .icon {
      color: #08a3a5;
      font-size: 28px;
      margin-right: 10px;
    }
  }

  .remain-time {
    color: #424242;
    font-size: 12px;
    padding-top: 8px;
  }

  .button-groups {
    margin-top: 16px;
    display: flex;
    justify-content: center;
  }
`;
