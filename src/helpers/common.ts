import { AnyObject } from "interfaces";

export const getWindowDimensions = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export const toObject = (fields: AnyObject[], key: string): AnyObject => {
  return fields.reduce((acc: any, obj) => {
    acc[obj[key]] = obj;
    return acc;
  }, {});
};
