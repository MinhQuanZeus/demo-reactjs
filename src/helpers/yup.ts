export const extractYupErrorPath = (path: string) => {
  const arr = path.split(".");
  const index = arr[0]?.replace(/[\\[\]']+/g, "");
  return {
    index: Number(index),
    key: arr[1],
  };
};
