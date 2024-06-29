export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
};

export const capitalJoin = (...args: Array<string>) => {
  return capitalize(args.join(" "));
};
