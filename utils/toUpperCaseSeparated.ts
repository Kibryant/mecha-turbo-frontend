export const toUpperCaseSeparated = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([0-9])([A-Z])/g, "$1 $2")
    .toUpperCase();
};
